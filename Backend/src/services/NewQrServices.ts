import { pool } from '../config/Database.js';
import QRCode from "qrcode";

export const getNewQrLogic = async (uid: string) => {
    try {
        const [rows] = await pool.query("SELECT * FROM qr_codes WHERE user_id = ?", [uid]);

        return { success: true, data: rows };
    } catch (error) {
        console.error("Get QR by user error:", error);
        return { success: false, message: "Failed to fetch QR codes!" };
    }
};

export const postNewQrLogic = async (newQrData: any) => {
    try {
        let qrPayload: string = "";

        switch (newQrData.qr_type) {
            case "website":
                qrPayload = newQrData.content.websiteContent as string;
                break;
            case "text":
                qrPayload = newQrData.content.textContent as string;
                break;
            case "whatsapp":
                const phone = newQrData.content.whatsappNumber?.replace(/\D/g, "");
                const message = encodeURIComponent(newQrData.content.whatsappMessage || "");
                qrPayload = `https://wa.me/${phone}${message ? `?text=${message}` : ""}`;;
                break;
            case "email":
                qrPayload = `mailto:${newQrData.content.emailContent}`;
                break;
            case "wiFi":
                qrPayload = `WIFI:T:${newQrData.content.wifiEncryption};S:${newQrData.content.wifiSsid};P:${newQrData.content.wifiPassword};;`;
                break;
            case "location":
                switch (newQrData.content.locationTab) {
                    case "Complete":
                        const fullAddress = `${newQrData.content.locationStreet || ""}, ${newQrData.content.locationArea || ""}, ${newQrData.content.locationCity || ""}, ${newQrData.content.locationState || ""}, ${newQrData.content.locationCountry || ""}`;
                        qrPayload = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
                        break;
                    case "Coordinates":
                        qrPayload = `https://www.google.com/maps?q=${newQrData.content?.latitude},${newQrData.content?.longitude}`;
                        break;
                    default:
                        throw new Error("Invalid location mode");
                }
                break;
            default:
                throw new Error("Invalid qr type");
        }

        const qrOptions = {
            errorCorrectionLevel: newQrData.design?.errorCorrectionLevel || 'Q',
            color: {
                dark: newQrData.design?.color?.foregroundColor || '#000000',
                light: newQrData.design?.color?.backgroundColor || '#ffffff'
            }
        };

        const qrImageBase64 = await QRCode.toDataURL(qrPayload, qrOptions);

        const query = `INSERT INTO qr_codes(user_id, name, qr_type, content, design, configuration, qr) VALUES (?, ?, ?, ?, ?, ?, ?);`;

        const values = [
            newQrData.user_id,
            newQrData.name,
            newQrData.qr_type,
            JSON.stringify(newQrData.content),
            JSON.stringify(newQrData.design),
            JSON.stringify(newQrData.configuration),
            qrImageBase64
        ];

        await pool.query(query, values);

        return { success: true, message: "QR generated successfully.", qr_image: qrImageBase64 };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Unable to generate QR!" };
    }
};

export const updateNewQrLogic = async (id: number, newQrData: any) => {
    try {
        let query = `UPDATE qr_codes SET name=?,qr_type=?,content=?, design=?, from_date=?, to_date=?, scan_limit=?, password=?, state=? WHERE qr_id = ?;`;
        let values = [newQrData.name, newQrData.qr_type, newQrData.content, newQrData.design, newQrData.from_date, newQrData.to_date, newQrData.scan_limit, newQrData.password, newQrData.state, id];

        await pool.query(query, values);

        return {success: true, message: "QR details updated successfully."};
    } catch (error) {
        console.log(error);
        return {success: false, message: "QR details not updated!"};
    }
};

export const deleteNewQrLogic = async (id: number) => {
    try {
        await pool.query(`DELETE FROM qr_codes WHERE qr_id= ?;`,[id]);
        
        return {success: true, message: "QR deleted successfully."};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Unable to delete QR!"};
    }
};
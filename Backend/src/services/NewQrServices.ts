import { pool } from '../config/Database.js';
import bcrypt from 'bcryptjs'
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
                qrPayload = newQrData.content.url as string;
                break;
            case "text":
                qrPayload = newQrData.content.text as string;
                break;
            case "whatsapp":
                const whatsapp = newQrData.content.whatsapp || {};
                const phone = whatsapp.whatsappNumber?.replace(/\D/g, "");
                const message = encodeURIComponent(whatsapp.whatsappMessage || "");
                qrPayload = `https://wa.me/${phone}${message ? `?text=${message}` : ""}`;;
                break;
            case "email":
                qrPayload = `mailto:${newQrData.content.email}`;
                break;
            case "wiFi":
                const wifi = newQrData.content.wiFi as any;
                qrPayload = `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};;`;
                break;
            case "location":
                const location = newQrData.content?.location || {};
                switch (location.mode) {
                    case "Complete":
                        const address = location?.address || {};
                        const fullAddress = `${address.locationStreet || ""}, ${address.locationArea || ""}, ${address.locationCity || ""}, ${address.locationState || ""}, ${address.locationCountry || ""}`;
                        qrPayload = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
                        break;
                    case "Coordinates":
                        qrPayload = `https://www.google.com/maps?q=${location?.coordinates?.latitude},${location?.coordinates?.longitude}`;
                        break;
                    default:
                        throw new Error("Invalid location mode");
                }
                break;
            default:
                throw new Error("Invalid qr type");
        }

        const qrImageBase64 = await QRCode.toDataURL(qrPayload);

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

export const updateNewQrLogic = async (id: number, newQrData: NewQrData) => {
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
import { pool } from '../config/Database.js';
import bcrypt from 'bcryptjs'
import QRCode from "qrcode";

interface NewQrData {
    user_id?: number;
    name?: string;
    qr_type?: string;
    content?: object | string;
    design?: object | string;
    from_date?: Date | string;
    to_date?: Date | string;
    scan_limit?: number;
    password?: string | number;
    state?: string;
}

export const getNewQrLogic = async (id: number) => {
    try {
        const [rows] = await pool.query("SELECT * FROM qr_codes WHERE user_id = ?", [id]);
        const dataWithQr: any[] = [];

        for (let row of rows as any[]) {
            if (typeof row.design === "string") {
                row.design = JSON.parse(row.design);
            }

            if (typeof row.content === "string") {
                try {
                    row.content = JSON.parse(row.content);
                } catch {
                    // plain string like website URL is fine
                }
            }

            let qrPayload = "";
            switch (row.qr_type) {
                case "Website":
                case "Text":
                    qrPayload = typeof row.content === "object" ? row.content.value || JSON.stringify(row.content) : row.content;
                    break;
                case "WhatsApp":
                    qrPayload = `https://wa.me/${row.content.number || row.content}`;
                    break;
                case "Email":
                    qrPayload = `mailto:${row.content.email || row.content}`;
                    break;
                case "WiFi":
                    qrPayload = `WIFI:T:${row.content.encryption};S:${row.content.ssid};P:${row.content.password};;`;
                    break;
                default:
                    qrPayload = typeof row.content === "object" ? JSON.stringify(row.content) : row.content;
            }

            row.qr_image = await QRCode.toDataURL(qrPayload);

            dataWithQr.push(row);
        }

        return { success: true, data: dataWithQr };
    } catch (error) {
        console.error("Get QR by user error:", error);
        return { success: false, message: "Failed to fetch QR codes" };
    }
};

export const postNewQrLogic = async (newQrData: NewQrData) => {
    try {
        const hashedPassword = newQrData.password
            ? await bcrypt.hash(newQrData.password.toString(), 10)
            : null;

        let qrPayload: string = "";
        switch (newQrData.qr_type) {
            case "website":
                qrPayload = newQrData.content as string;
                break;
            case "text":
                qrPayload = newQrData.content as string;
                break;
            case "whatsApp":
                qrPayload = `https://wa.me/${newQrData.content}`;
                break;
            case "email":
                qrPayload = `mailto:${newQrData.content}`;
                break;
            case "wiFi":
                const wifi = newQrData.content as any;
                qrPayload = `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};;`;
                break;
            default:
                qrPayload = newQrData.content as string;
        }

        const qrImageBase64 = await QRCode.toDataURL(qrPayload);

        const query = `
          INSERT INTO qr_codes(user_id, name, qr_type, content, design, from_date, to_date, scan_limit, password, state) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const values = [
            newQrData.user_id,
            newQrData.name,
            newQrData.qr_type,
            JSON.stringify(newQrData.content),
            JSON.stringify(newQrData.design),
            newQrData.from_date,
            newQrData.to_date,
            newQrData.scan_limit,
            hashedPassword,
            newQrData.state,
        ];

        const [result] = await pool.query(query, values);

        return {
            success: true,
            message: "QR added successfully.",
            qr_code_id: (result as any).insertId,
            qr_image: qrImageBase64
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: "QR not added!" };
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
        await pool.query(`DELETE FROM qr_codes WHERE qr_id= ?`,[id]);
        
        return {success: true, message: "QR deleted successfully"};
    } catch (error) {
        console.log(error);
        return {success: false, message: "QR not deleted!"};
    }
};
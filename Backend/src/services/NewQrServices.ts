import { pool } from '../config/Database.js';
import bcrypt from 'bcryptjs'

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
        let [rows] = await pool.query(`SELECT * FROM qr_codes WHERE user_id=?;`, [id]);

        return {success: true, data: rows};
    } catch (error) {
        console.log(error);
        return {success: false, message: "QR code not found!"};
    }
};

export const postNewQrLogic = async (newQrData: NewQrData) => {
    try {
        const hashedPassword = await bcrypt.hash(newQrData.password, 10);

        const query = `INSERT INTO qr_codes(user_id, name, qr_type, content, design, from_date, to_date, scan_limit, password, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const values = [newQrData.user_id, newQrData.name, newQrData.qr_type, newQrData.content, newQrData.design, newQrData.from_date, newQrData.to_date, newQrData.scan_limit, newQrData.hashedPassword, newQrData.state];

        await pool.query(query, values);
        
        return {success: true, message: "QR added successfully."};
    } catch (error) {
        console.log(error);
        return {success: false, message: "QR not added!"};
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
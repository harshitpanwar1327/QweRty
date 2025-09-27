import { pool } from '../config/Database.js'
import dotenv from 'dotenv'
import { RowDataPacket } from 'mysql2/promise'
import sendWelcomeMail from '../config/NodeMailer.js'

dotenv.config();

interface UserData {
  name: string;
  email: string;
}

export const registerUserLogic = async (userData: UserData) => {
    try {
        const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM users WHERE email = ?;`, [userData.email]);

        if (rows.length > 0) {
            return { success: false, message: "User already exists with provided email!" };
        }

        const query = `INSERT INTO users(name, email) VALUES (?, ?);`;
        const values = [userData.name, userData.email];

        await pool.query(query, values);

        let mailResponse = await sendWelcomeMail(userData.name, userData.email);

        return { success: true, message: "User registered successfully.", mailResponse };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Registration failed!" };
    }
};
import { pool } from '../config/Database.js'
import dotenv from 'dotenv'
import { RowDataPacket } from 'mysql2/promise'
import sendWelcomeMail from '../config/NodeMailer.js'

dotenv.config();

interface UserData {
  uid: string;
  name: string;
  email: string;
}

export const registerUserLogic = async (userData: UserData) => {
    try {
        const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM users WHERE email = ?;`, [userData.email]);

        if (rows.length > 0) {
            return { success: false, message: "User already exists with provided email!" };
        }

        const query = `INSERT INTO users(user_id, name, email) VALUES (?, ?, ?);`;
        const values = [userData.uid, userData.name, userData.email];

        await pool.query(query, values);

        const today = new Date();
        const expiry_date = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
        
        const subscriptionQuery = `INSERT INTO subscriptions (user_id, plan_name, duration, productId, purchase_date, expiry_date) VALUES (?, ?, ?, ?, ?, ?);`;
        const subscriptionValues = [userData.uid, 'Free', 'quarterly', 'com.codeweave.freeQuarterly', today.toISOString().slice(0, 19).replace('T', ' '), expiry_date.toISOString().slice(0, 19).replace('T', ' ')];

        await pool.query(subscriptionQuery, subscriptionValues);

        let mailResponse = await sendWelcomeMail(userData.name, userData.email);

        return { success: true, message: "User registered successfully.", mailResponse };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Registration failed!" };
    }
};
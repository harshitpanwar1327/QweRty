import { pool } from '../config/Database.js'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { RowDataPacket } from 'mysql2/promise';

dotenv.config();

interface UserData {
  name?: string;
  email?: string;
  password_hash: string;
}

export const registerUserLogic = async (userData: UserData) => {
    try {
        const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM users WHERE name = ? OR email = ?;`, [userData.name || null, userData.email || null]);

        if (rows.length > 0) {
            return { success: false, message: "User already exists with provided email." };
        }

        const hashedPassword = await bcrypt.hash(userData.password_hash, 10);

        const query = `INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`;
        const values = [userData.name || null, userData.email || null, hashedPassword];

        await pool.query(query, values);

        return { success: true, message: "User registered successfully" };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Registration failed!" };
    }
};

export const loginUserLogic = async (userData: UserData) => {
    try {
        const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM users WHERE email = ?`,[userData.email || null]);

        if (rows.length === 0) {
            return {success: false, message: "User not found with provided email"};
        }

        const user = rows[0];

        const passwordMatch = await bcrypt.compare(userData.password_hash, user.password_hash);
        if (!passwordMatch) {
            return { success: false, message: "Invalid Credentials!" };
        }

        const token = jwt.sign(
            { id: user.user_id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '3h' }
        );

        return { success: true, message: "Login Successful", token };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Login failed!" };
    }
};
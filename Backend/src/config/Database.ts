import dotenv from 'dotenv'
import {createPool} from 'mysql2/promise'

dotenv.config();

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    connectionLimit: 10,
    queueLimit: 5,
    waitForConnections: true
});

const checkConnection = async()=>{
    try {
        let connection = await pool.getConnection();
        console.log("Connection successfull");
        connection.release();
    } catch (error) {
        console.log(error);
    }
};

export { pool, checkConnection }
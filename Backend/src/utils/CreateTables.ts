import {pool} from '../config/Database.js'

const users = `CREATE TABLE IF NOT EXISTS users(
    user_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`;

const subscriptions = `CREATE TABLE IF NOT EXISTS subscriptions(
    subscription_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    plan_name ENUM('Free', 'Pro', 'Business') NOT NULL,
    duration ENUM('quarterly', 'annually') NOT NULL,
    productId VARCHAR(50) NOT NULL,
    purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expiry_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);`;

const qr_codes = `CREATE TABLE IF NOT EXISTS qr_codes(
    qr_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) UNIQUE NOT NULL,
    qr_type ENUM('website', 'text', 'whatsapp', 'email', 'wifi', 'location', 'vcard') NOT NULL,
    content JSON NOT NULL,
    design JSON,
    configuration JSON,
    qr TEXT NOT NULL,
    state ENUM('Active', 'Paused', 'Finished') DEFAULT 'Active',
    total_scans INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);`;

const qr_analytics = `CREATE TABLE IF NOT EXISTS qr_analytics(
    analytics_id INT AUTO_INCREMENT PRIMARY KEY,
    qr_id INT NOT NULL,
    scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45) DEFAULT NULL,
    country VARCHAR(100) DEFAULT NULL,
    city VARCHAR(100) DEFAULT NULL,
    device_type VARCHAR(50) DEFAULT NULL,
    FOREIGN KEY (qr_id) REFERENCES qr_codes(qr_id) ON DELETE CASCADE
);`;

const createTable = async (tableName: string, query: string)=>{
    try {
        await pool.query(query);
        console.log(`${tableName} table created successfully.`);
    } catch (error) {
        console.log(`${tableName} not created!`, error);
    }
};

const createAllTables = async () => {
    try {
        await createTable('Users', users);
        await createTable('Subscriptions', subscriptions);
        await createTable('Qr_codes', qr_codes);
        await createTable('Qr_analytics', qr_analytics);
    } catch (error) {
        console.log(error);
    }
}

export default createAllTables
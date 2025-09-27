import {pool} from '../config/Database.js'

const users = `CREATE TABLE IF NOT EXISTS users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`;

const subscriptions = `CREATE TABLE IF NOT EXISTS subscriptions(
    subscription_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    plan_name ENUM('Free', 'Pro', 'Business') NOT NULL,
    purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    activation_date DATETIME,
    expiry_date DATETIME NOT NULL,
    status ENUM('Active', 'Expired', 'Cancelled'),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
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
    } catch (error) {
        console.log(error);
    }
}

export default createAllTables
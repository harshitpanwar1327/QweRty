import { pool } from '../config/Database.js'

interface SubscriptionData {
    user_id?: number;
    plan_name?: string;
    purchase_date?: Date | string;
    activation_date?: Date | string; 
    expiry_date?: Date | string;
}

export const getSubscriptionsLogic = async (id: number) => {
    try {
        let [rows] = await pool.query(`SELECT * FROM subscriptions WHERE user_id=?;`, [id]);

        return {success: true, data: rows};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Subscription details not found!"};
    }
};

export const postSubscriptionsLogic = async (subscriptionData: SubscriptionData) => {
    try {
        const query = `INSERT INTO subscriptions (user_id, plan_name, purchase_date, activation_date, expiry_date) VALUES (?, ?, ?, ?, ?);`;
        const values = [subscriptionData.user_id, subscriptionData.plan_name, subscriptionData.purchase_date, subscriptionData.activation_date, subscriptionData.expiry_date];

        await pool.query(query, values);
        
        return {success: true, message: "Subscription added successfully."};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Subscription not added!"};
    }
};

export const updateCancelSubscriptionsLogic = async (id: number) => {
    try {
        const [rows]:any = await pool.query(`UPDATE subscriptions SET status='cancelled' WHERE subscription_id = ?;`, [id]);

        if (rows.affectedRows === 0) {
            return { success: false, message: "Subscription not found." };
        }

        return {success: true, message: "Subscription cancelled successfully."};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Subscription not cancelled!"};
    }
};

export const updateRenewSubscriptionsLogic = async (id: number) => {
    try {
        const [rows]:any = await pool.query(`UPDATE subscriptions SET status='active' WHERE subscription_id = ?;`, [id]);

        if (rows.affectedRows === 0) {
            return { success: false, message: "Subscription not found." };
        }

        return {success: true, message: "Subscription renewed successfully"};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Subscription not renewed!"};
    }
};
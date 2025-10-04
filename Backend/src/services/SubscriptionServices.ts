import { RowDataPacket } from 'mysql2';
import { pool } from '../config/Database.js';
import { calculateAdjustedDays } from '../utils/Helper.js';

interface SubscriptionData {
    uid: number;
    plan_name: string;
    duration: string;
}

export const getSubscriptionsLogic = async (uid: number) => {
    try {
        let [rows] = await pool.query(`SELECT * FROM subscriptions WHERE user_id=?;`, [uid]);

        return {success: true, data: rows};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Subscription details not found!"};
    }
};

const SubscriptionPlans: Record<string, any> = {
    Free: {
        quarterly: { productId: "com.codeweave.freeQuarterly", days: 90 },
        annually: { productId: "com.codeweave.freeQuarterly", days: 365 }
    },
    Pro: {
        quarterly: { productId: "com.codeweave.proQuarterly", days: 90 },
        annually: { productId: "com.codeweave.proQuarterly", days: 365 }
    },
    Business: {
        quarterly: { productId: "com.codeweave.businessQuarterly", days: 90 },
        annually: { productId: "com.codeweave.businessQuarterly", days: 365 }
    }
};

export const postSubscriptionLogic = async (subscriptionData: SubscriptionData) => {
    try {
        let [subscriptions] = await pool.query<RowDataPacket[]>(`SELECT * FROM subscriptions WHERE user_id=?;`, [subscriptionData.uid]);

        const today = new Date();
        let adjustedDays = 0;

        const activePlan = subscriptions.find((sub: any) => new Date(sub.expiry_date) > today);

        if (activePlan) {
            adjustedDays = calculateAdjustedDays(activePlan, SubscriptionPlans[subscriptionData.plan_name]?.[subscriptionData.duration]?.productId);
        }

        const selectedPlan = SubscriptionPlans[subscriptionData.plan_name]?.[subscriptionData.duration];
        if (!selectedPlan) {
            return { success: false, message: "Invalid plan or duration." };
        }

        const expiryDate = new Date(today.getTime() + (selectedPlan.days + adjustedDays) * 24 * 60 * 60 * 1000);

        const insertQuery = `INSERT INTO subscriptions (user_id, plan_name, duration, productId, purchase_date, expiry_date) VALUES (?, ?, ?, ?, ?, ?);`;
        const insertValues = [
            subscriptionData.uid,
            subscriptionData.plan_name,
            subscriptionData.duration,
            selectedPlan.productId,
            today.toISOString().slice(0, 19).replace('T', ' '),
            expiryDate.toISOString().slice(0, 19).replace('T', ' ')
        ];

        await pool.query(insertQuery, insertValues);

        return { success: true, message: "Subscription added successfully." };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Subscription not added!" };
    }
};
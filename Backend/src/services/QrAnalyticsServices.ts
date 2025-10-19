import { pool } from "../config/Database.js";
import { getLocationFromIP } from "../utils/Helper.js";

export const scanAnalyticsLogic = async (id: number, clientIp: string | null, deviceType: string) => {
    try {
        const [rows]: any = await pool.query(`SELECT * FROM qr_codes WHERE qr_id = ?;`, [id]);
        if(!rows || rows.length === 0) {
            return { success: false, message: "QR not found!" };
        }

        const qrData = rows[0];

        if(qrData.state==='Paused') {
            return { success: false, message: 'QR code is paused by the owner!', isPaused: true }
        }
        
        const content = typeof qrData.content === "string" ? JSON.parse(qrData.content) : qrData.content;
        const configuration = typeof qrData.configuration === "string" ? JSON.parse(qrData.configuration) : qrData.configuration;

        const now = new Date();
        if(configuration?.from_date && configuration?.to_date) {
            const startDate = new Date(configuration.from_date);
            const endDate = new Date(configuration.to_date);

            if(now > endDate) {
                await pool.query(`UPDATE qr_codes SET state = 'Finished' WHERE qr_id = ?;`, [id]);

                return { success: false, message: 'QR code is not active at this time!', inActive: true }
            } else if(now < startDate) {
                await pool.query(`UPDATE qr_codes SET state = 'Paused' WHERE qr_id = ?;`, [id]);

                return { success: false, message: 'QR code is not active at this time!', inActive: true }
            } else {
                await pool.query(`UPDATE qr_codes SET state = 'Active' WHERE qr_id = ?;`, [id]);

                return { success: true, message: 'QR code is now active.' }
            }
        }

        if(configuration?.scan_limit) {
            const [analyticsData]: any = await pool.query(`SELECT COUNT(*) AS scans FROM qr_analytics WHERE qr_id = ?`, [id]);

            const alreadyScans = analyticsData[0].scans;
            if(alreadyScans >= configuration.scan_limit) {
                await pool.query(`UPDATE qr_codes SET state = 'Finished' WHERE qr_id = ?;`, [id]);

                return { success: false, message: 'QR code scan limit reached!', limitReached: true }
            }
        }

        if (configuration?.password && configuration.password !== "") {
            return { success: true, requiresPassword: true, qrId: id };
        }

        const { country, city } = await getLocationFromIP(clientIp);

        await pool.query(`INSERT INTO qr_analytics (qr_id, ip_address, country, city, device_type) VALUES (?, ?, ?, ?, ?);`, [id, clientIp, country, city, deviceType]);

        await pool.query(`UPDATE qr_codes SET total_scans = total_scans + 1 WHERE qr_id = ?`, [id]);

        let redirectURL = "#";

        switch (qrData.qr_type) {
            case "website":
                redirectURL = content.websiteContent;
                break;

            case "whatsapp":
                const phone = content.whatsappNumber?.replace(/\D/g, "");
                const message = encodeURIComponent(content.whatsappMessage || "");
                redirectURL = `https://wa.me/${phone}${message ? `?text=${message}` : ""}`;
                break;

            case "email":
                redirectURL = `mailto:${content.emailContent}`;
                break;

            case "location":
                if (content.locationTab === "Coordinates") {
                    redirectURL = `https://www.google.com/maps?q=${content.latitude},${content.longitude}`;
                } else {
                    const fullAddress = `${content.locationStreet || ""}, ${content.locationArea || ""}, ${content.locationCity || ""}, ${content.locationState || ""}, ${content.locationCountry || ""}`;
                    redirectURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
                }
                break;

            default:
                throw new Error("Invalid QR type");
        }

        return { success: true, redirectURL };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to save QR analytics!" };
    }
}

export const verifyPasswordLogic = async (id: number, password: string, clientIp: string | null, deviceType: string) => {
    try {
        const [rows]: any = await pool.query(`SELECT * FROM qr_codes WHERE qr_id = ?`, [id]);
        if(!rows || rows.length === 0) {
            return { success: false, message: "QR not found!" };
        }

        const qrData = rows[0];

        const configuration = typeof qrData.configuration === "string" ? JSON.parse(qrData.configuration) : qrData.configuration;

        if (!configuration?.password) {
            return { success: false, message: "This QR code does not require a password." }
        }

        if (configuration.password !== password) {
            return { success: false, message: "Incorrect password. Please try again.", incorrectPassword: true }
        }

        const content = typeof qrData.content === "string" ? JSON.parse(qrData.content) : qrData.content;

        const { country, city } = await getLocationFromIP(clientIp);

        await pool.query(`INSERT INTO qr_analytics (qr_id, ip_address, country, city, device_type) VALUES (?, ?, ?, ?, ?);`, [id, clientIp, country, city, deviceType]);

        await pool.query(`UPDATE qr_codes SET total_scans = total_scans + 1 WHERE qr_id = ?`, [id]);

        let redirectURL = "#";

        switch (qrData.qr_type) {
            case "website":
                redirectURL = content.websiteContent;
                break;

            case "whatsapp":
                const phone = content.whatsappNumber?.replace(/\D/g, "");
                const message = encodeURIComponent(content.whatsappMessage || "");
                redirectURL = `https://wa.me/${phone}${message ? `?text=${message}` : ""}`;
                break;

            case "email":
                redirectURL = `mailto:${content.emailContent}`;
                break;

            case "location":
                if (content.locationTab === "Coordinates") {
                    redirectURL = `https://www.google.com/maps?q=${content.latitude},${content.longitude}`;
                } else {
                    const fullAddress = `${content.locationStreet || ""}, ${content.locationArea || ""}, ${content.locationCity || ""}, ${content.locationState || ""}, ${content.locationCountry || ""}`;
                    redirectURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
                }
                break;

            default:
                throw new Error("Invalid QR type");
        }

        return { success: true, redirectURL };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to verify password!" };
    }
}
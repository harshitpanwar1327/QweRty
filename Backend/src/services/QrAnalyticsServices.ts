import { pool } from "../config/Database.js";
import { getLocationFromIP } from "../utils/Helper.js";

export const postAnalyticsLogic = async (id: number, clientIp: string | null, deviceType: string) => {
    try {
        const [rows]: any = await pool.query(`SELECT * FROM qr_codes WHERE qr_id = ?;`, [id]);
        if(rows.length === 0) {
            return { success: false, message: "QR not found!" };
        }

        const qrData = rows[0];
        const content = typeof qrData.content === "string" ? JSON.parse(qrData.content) : qrData.content;
        const { country, city } = await getLocationFromIP(clientIp);

        await pool.query(`INSERT INTO qr_analytics (qr_id, ip_address, country, city, device_type) VALUES (?, ?, ?, ?, ?);`, [id, clientIp, country, city, deviceType]);

        await pool.query(`UPDATE qr_codes SET total_scans = total_scans + 1 WHERE qr_id = ?`, [id]);

        let redirectURL = "#";

        switch (qrData.qr_type) {
        case "website":
            redirectURL = content.websiteContent;
            break;

        case "text":
            redirectURL = `data:text/plain,${encodeURIComponent(content.textContent)}`;
            break;

        case "whatsApp":
            const phone = content.whatsappNumber?.replace(/\D/g, "");
            const message = encodeURIComponent(content.whatsappMessage || "");
            redirectURL = `https://wa.me/${phone}${message ? `?text=${message}` : ""}`;
            break;

        case "email":
            redirectURL = `mailto:${content.emailContent}`;
            break;

        case "wiFi":
            redirectURL = `WIFI:T:${content.wifiEncryption};S:${content.wifiSsid};P:${content.wifiPassword};;`;
            break;

        case "location":
            if (content.locationTab === "Coordinates") {
                redirectURL = `https://www.google.com/maps?q=${content.latitude},${content.longitude}`;
            } else {
                const fullAddress = `${content.locationStreet || ""}, ${content.locationArea || ""}, ${content.locationCity || ""}, ${content.locationState || ""}, ${content.locationCountry || ""}`;
                redirectURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
            }
            break;

        case "vCard":
            const contact = content;

            interface PhoneNumber {
                type: string,
                number: string
            }

            const address = `${contact.locationStreet || ""};${contact.locationCity || ""};${contact.locationState || ""};${contact.locationPostalCode || ""};${contact.locationCountry || ""}`;

            const vcard = [
                "BEGIN:VCARD",
                "VERSION:3.0",
                `N:${contact.lastName || ""};${contact.firstName || ""};;;`,
                `FN:${contact.firstName || ""} ${contact.lastName || ""}`,
                contact.company ? `ORG:${contact.company}` : "",
                contact.title ? `TITLE:${contact.title}` : "",
                ...(Array.isArray(contact.phones)
                    ? contact.phones
                        .filter((p: PhoneNumber) => p.number && p.type)
                        .map((p: PhoneNumber) => `TEL;TYPE=${p.type.toUpperCase()}:${p.number}`)
                    : []),
                contact.email ? `EMAIL;TYPE=WORK:${contact.email}` : "",
                contact.website ? `URL:${contact.website}` : "",
                (contact.locationStreet || contact.locationCity || contact.locationState || contact.locationPostalCode || contact.locationCountry)
                    ? `ADR;TYPE=WORK:;;${address}`
                    : "",
                "END:VCARD",
            ]
                .filter(Boolean)
                .join("\n");

            return { success: true, vcard, filename: contact.firstName || "contact" };

        default:
            redirectURL = "#";
        }

        console.log("Redirecting to:", redirectURL);

        return { success: true, redirectURL };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to save QR analytics!" };
    }
}
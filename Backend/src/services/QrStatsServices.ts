import { pool } from "../config/Database.js";

interface QrCodesRow {
    qr_id?: number,
    name?: string
}

interface QrAnalyticsRow {
    country: string,
    city: string,
    device_type: string
}

export const statsFilterLogic = async (uid: string) => {
    try {
        const [qr_codes]: any = await pool.query(`SELECT qr_id, name FROM qr_codes WHERE user_id = ? AND qr_type NOT IN ('text', 'wifi', 'vcard')`, [uid]);
        const qr_ids = qr_codes.map((row: QrCodesRow) => row.qr_id);
        const qrCodes = qr_codes.map((row: QrCodesRow) => row.name);

        if (qr_ids.length === 0) {
            return { success: true, data: {countries: [], cities: [], os: []}}
        }

        const [qr_analytics]: any = await pool.query(`SELECT * FROM qr_analytics WHERE qr_id IN (?)`, [qr_ids]);
        const countries = [...new Set(qr_analytics.map((row: QrAnalyticsRow) => row.country?.trim()).filter(Boolean))];
        const cities = [...new Set(qr_analytics.map((row: QrAnalyticsRow) => row.city?.trim()).filter(Boolean))];
        const os = [...new Set(qr_analytics.map((row: QrAnalyticsRow) => row.device_type?.trim()).filter(Boolean))];

        return { success: true, data: { qrCodes, countries, cities, os } };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Unable to filter data!" };
    }
}

interface Filter {
    qrCodes: string[],
    os: string[],
    countries: string[],
    cities: string[]
}

export const getStatsLogic = async (uid: string, filter: Filter, date: string) => {
    try {
        const conditionsCode: string[] = [`user_id = '${uid}' AND qr_type NOT IN ('text', 'wifi', 'vcard')`];
        const paramsCode: any[] = [];

        if (filter.qrCodes?.length > 0) {
            conditionsCode.push(`name IN (?)`);
            paramsCode.push(filter.qrCodes);
        }

        const whereClauseCode = `WHERE ${conditionsCode.join(' AND ')}`;

        const [qr_codes]: any = await pool.query(`SELECT qr_id, name FROM qr_codes ${whereClauseCode}`, paramsCode);
        const qr_ids = qr_codes.map((row: QrCodesRow) => row.qr_id);

        if (qr_ids.length === 0) {
            return { success: true, data: { totalQrs: 0, totalScans: 0, countries: [], cities: [], os: [] } }
        }

        const conditionsAnalytics: string[] = [`qr_id IN (${qr_ids.join(',')})`];
        const paramsAnalytics: any[] = [];

        const now = new Date();
        let startDate: Date | null = null;

        switch (date) {
            case 'today':
                startDate = new Date();
                startDate.setHours(0, 0, 0, 0);
                conditionsAnalytics.push(`scanned_at >= ?`);
                paramsAnalytics.push(startDate);
                break;
            case 'lastSevenDays':
                startDate = new Date();
                startDate.setDate(now.getDate() - 7);
                conditionsAnalytics.push(`scanned_at >= ?`);
                paramsAnalytics.push(startDate);
                break;
            case 'lastThirtyDays':
                startDate = new Date();
                startDate.setDate(now.getDate() - 30);
                conditionsAnalytics.push(`scanned_at >= ?`);
                paramsAnalytics.push(startDate);
                break;
            case 'lastNintyDays':
                startDate = new Date();
                startDate.setDate(now.getDate() - 90);
                conditionsAnalytics.push(`scanned_at >= ?`);
                paramsAnalytics.push(startDate);
                break;
            case 'lifetime':
            default:
                break;
        }

        if (filter.os?.length > 0) {
            conditionsAnalytics.push(`device_type IN (?)`);
            paramsAnalytics.push(filter.os);
        }

        if (filter.countries?.length > 0) {
            conditionsAnalytics.push(`country IN (?)`);
            paramsAnalytics.push(filter.countries);
        }

        if (filter.cities?.length > 0) {
            conditionsAnalytics.push(`city IN (?)`);
            paramsAnalytics.push(filter.cities);
        }

        const whereClauseAnalytics = `WHERE ${conditionsAnalytics.join(' AND ')}`;

        const [qr_analytics]: any = await pool.query(`SELECT * FROM qr_analytics ${whereClauseAnalytics}`, paramsAnalytics);

        const [osData]: any = await pool.query(`SELECT device_type, COUNT(*) AS scans FROM qr_analytics ${whereClauseAnalytics} AND device_type IS NOT NULL GROUP BY device_type ORDER BY scans DESC`, paramsAnalytics);
        const [countryData]: any = await pool.query(`SELECT country, COUNT(*) AS scans FROM qr_analytics ${whereClauseAnalytics} AND country IS NOT NULL GROUP BY country ORDER BY scans DESC`, paramsAnalytics);
        const [cityData]: any = await pool.query(`SELECT city, COUNT(*) AS scans FROM qr_analytics ${whereClauseAnalytics} AND city IS NOT NULL GROUP BY city ORDER BY scans DESC`, paramsAnalytics);

        return { success: true, data: {
            totalQrs: qr_ids.length,
            totalScans: qr_analytics.length,
            os: osData,
            countries: countryData,
            cities: cityData,
        } };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Unable to fetch stats!" };
    }
}
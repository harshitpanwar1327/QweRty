import { Request, Response } from "express";
import { scanAnalyticsLogic, verifyPasswordLogic } from '../services/QrAnalyticsServices.js';
import requestIp from "request-ip";
import useragent from "useragent";
import dotenv from 'dotenv';

dotenv.config();

interface QrAnalyticsReqParams {
    id: number;
}

interface QrAnalyticsReqBody {
    password: string;
}

export const scanAnalytics = async (req: Request<QrAnalyticsReqParams>, res: Response) => {
    const { id } = req.params;
    const clientIp = requestIp.getClientIp(req) || null;
    const agent = useragent.parse(req.headers["user-agent"]);
    const deviceType = agent.device.toString();

    if(!id){
        return res.status(400).json({success: false, message: "Qr id not found!"});
    }

    try {
        let response = await scanAnalyticsLogic(Number(id), clientIp, deviceType);

        if (response.vcard) {
            res.setHeader("Content-Disposition",`attachment; filename="contact".vcf"`);
            res.setHeader("Content-Type", "text/vcard; charset=utf-8");
            return res.send(response.vcard);
        } else if (response.text) {
            res.setHeader("Content-Disposition", 'attachment; filename="qr_text.txt"');
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            return res.send(response.text);
        } else if (response.wifi) {
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            return res.json(response.wifi);
        } else if (response.success && response.redirectURL) {
            return res.redirect(response.redirectURL);
        } else if (!response.success && response.isPaused) {
            return res.redirect(`${process.env.FRONTEND_URL}/#/config/pauseQR`);
        } else if (!response.success && response.inActive) {
            return res.redirect(`${process.env.FRONTEND_URL}/#/config/timeSchedule`);
        } else if (!response.success && response.limitReached) {
            return res.redirect(`${process.env.FRONTEND_URL}/#/config/scanLimit`);
        } else if (response.success && response.requiresPassword) {
            return res.redirect(`${process.env.FRONTEND_URL}/#/config/password/${id}`);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal Server error!"});
    }
}

export const verifyPassword = async (req: Request<QrAnalyticsReqParams, {}, QrAnalyticsReqBody>, res: Response) => {
    const { id } = req.params;
    const { password } = req.body;
    const clientIp = requestIp.getClientIp(req) || null;
    const agent = useragent.parse(req.headers["user-agent"]);
    const deviceType = agent.device.toString();

    if(!id){
        return res.status(400).json({success: false, message: "Qr id not found!"});
    }

    try {
        let response = await verifyPasswordLogic(id, password, clientIp, deviceType);

        if (response.vcard) {
            res.setHeader("Content-Disposition", `attachment; filename="contact".vcf"`);
            res.setHeader("Content-Type", "text/vcard; charset=utf-8");
            return res.send(response.vcard);
        } else if (response.text) {
            res.setHeader("Content-Disposition", 'attachment; filename="qr_text.txt"');
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            return res.send(response.text);
        } else if (response.wifi) {
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            return res.json(response.wifi);
        }

        const isAjaxRequest = req.xhr || req.headers.accept?.includes("application/json");

        if (response.success && response.redirectURL) {
            if (isAjaxRequest) {
                return res.json({ success: true, redirectURL: response.redirectURL });
            } else {
                return res.redirect(response.redirectURL);
            }
        } else {
            return res.json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal Server error!"});
    }
}
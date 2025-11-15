import { Request, Response } from "express";
import { scanAnalyticsLogic, verifyPasswordLogic, getQrDataLogic } from '../services/QrAnalyticsServices.js';
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
    const clientIp =
        (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
        (req.headers['x-real-ip'] as string) ||
        requestIp.getClientIp(req) ||
        null;
    const agent = useragent.parse(req.headers["user-agent"]);
    const deviceType = agent.device.toString();

    if(!id){
        return res.status(400).json({success: false, message: "Qr id not found!"});
    }

    try {
        let response = await scanAnalyticsLogic(Number(id), clientIp, deviceType);

        if (response.success && response.redirectURL) {
            return res.redirect(response.redirectURL);
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
    const clientIp =
        (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
        (req.headers['x-real-ip'] as string) ||
        requestIp.getClientIp(req) ||
        null;
    const agent = useragent.parse(req.headers["user-agent"]);
    const deviceType = agent.device.toString();

    if(!id){
        return res.status(400).json({success: false, message: "Qr id not found!"});
    }

    try {
        let response = await verifyPasswordLogic(id, password, clientIp, deviceType);

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

export const getQrData = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        if(!id){
            return res.status(400).json({success: false, message: "Qr id not found!"});
        }

        const response = await getQrDataLogic(Number(id));
        if(response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal Server error!"});
    }
}
import { Request, Response } from "express";
import { postAnalyticsLogic } from '../services/QrAnalyticsServices.js';
import requestIp from "request-ip";
import useragent from "useragent";

interface QrAnalyticsReqParams {
    id: string;
}

export const postAnalytics = async (req: Request<QrAnalyticsReqParams>, res: Response) => {
    const { id } = req.params;
    const clientIp = requestIp.getClientIp(req) || null;
    const agent = useragent.parse(req.headers["user-agent"]);
    const deviceType = agent.device.toString();

    if(!id){
        return res.status(400).json({success: false, message: "Qr id not found!"});
    }

    try {
        let response = await postAnalyticsLogic(Number(id), clientIp, deviceType);
        if (!response.success) {
            return res.status(400).json(response);
        }

        if (response.vcard) {
            res.setHeader(
                "Content-Disposition",
                `attachment; filename="${response.filename || "contact"}.vcf"`
            );
            res.setHeader("Content-Type", "text/vcard; charset=utf-8");
            return res.send(response.vcard);
        }

        return res.redirect(response.redirectURL);
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal Server error!"});
    }
}
import { Request, Response } from "express"
import { statsFilterLogic, getStatsLogic } from '../services/QrStatsServices.js'

export const statsFilter = async (req: Request, res: Response) => {
    const { uid } = req.params;
    
    if (!uid) {
        return res.status(400).json({ success: false, message: "User id not found!" });
    }

    try {
        const response = await statsFilterLogic(uid);
        if (response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
}

export const getStats = async (req: Request, res: Response) => {
    const { uid, filter, date } = req.body;
    
    if (!uid) {
        return res.status(400).json({ success: false, message: "User id not found!" });
    }

    try {
        const response = await getStatsLogic(uid, filter, date);
        if (response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
}
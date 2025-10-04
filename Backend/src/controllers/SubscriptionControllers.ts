import { Request, Response } from "express";
import { SubscriptionModels } from '../models/SubscriptionModels.js'
import { getSubscriptionsLogic, postSubscriptionLogic } from "../services/SubscriptionServices.js";

interface SubscriptionReqBody {
    uid: number,
    plan_name: string,
    duration: string
}

interface SubscriptionReqParams {
    uid: number
}

export const  getSubscriptions = async (req: Request<SubscriptionReqParams>, res: Response) => {
    const { uid } = req.params;

    if(!uid){
        return res.status(400).json({success: false, message: "User id not found!"});
    }

    try {
        let response = await getSubscriptionsLogic(Number(uid));
        if(response.success){
            return res.status(200).json(response);
        }else{
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error!"});
    }
}

export const postSubscription = async(req: Request<{}, {}, SubscriptionReqBody>, res: Response)=>{
    const { uid, plan_name, duration } = req.body;
    
    if(!uid || !plan_name || !duration){
        return res.status(400).json({success: false, message: "User id or plan details not found!"});
    }
    
    const subscriptionData = new SubscriptionModels({uid, plan_name, duration});
    
    try {
        const response = await postSubscriptionLogic(subscriptionData);
        if(response.success){
            return res.status(200).json(response);
        }else{
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error!"});
    }
}
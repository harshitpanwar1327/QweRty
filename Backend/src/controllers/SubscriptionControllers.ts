import { Request, Response } from "express";
import { SubscriptionModels } from '../models/SubscriptionModels.js'
import { getSubscriptionsLogic, postSubscriptionsLogic, updateCancelSubscriptionsLogic, updateRenewSubscriptionsLogic } from "../services/SubscriptionServices.js";

export const getSubscriptions = async (req: Request, res: Response) => {
    const id = req.params.user_id;

    if(!id){
        return res.status(400).json({success: false, message: "User id not found!"});
    }

    try {
        let response = await getSubscriptionsLogic(id);
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

export const postSubscriptions = async(req: Request, res: Response)=>{
    const { user_id, plan_name, purchase_date, activation_date, expiry_date } = req.body;
    
    if(!user_id || !plan_name || !purchase_date || !activation_date || !expiry_date){
        return res.status(400).json({success: false, message: "All fields required!"});
    }
    
    const subscriptionData = new SubscriptionModels({user_id, plan_name,purchase_date, activation_date, expiry_date});
    
    try {
        const response = await postSubscriptionsLogic(subscriptionData);
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

export const updateCancelSubscriptions = async(req: Request, res: Response)=>{
    const id = req.params.id;

    if(!id){
        return res.status(400).json({success: false, message: "Subscription id not found!"});
    }
    
    try {
        let response = await updateCancelSubscriptionsLogic(id);
        if(response.success){
            return res.status(200).json(response);
        }else{
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, message: "Internal server error!"});
    }
}

export const updateRenewSubscriptions = async(req: Request, res: Response)=>{
    const id = req.params.id;

    if(!id){
        return res.status(400).json({success: false, message: "Subscription id not found!"});
    }
    
    try {
        let response = await updateRenewSubscriptionsLogic(id);
        if(response.success){
            return res.status(200).json(response);
        }else{
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, message: "Internal server error!"});
    }
}
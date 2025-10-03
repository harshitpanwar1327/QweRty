import { Request, Response } from "express";
import { NewQrModels } from '../models/NewQrModels.js'
import { getNewQrLogic, postNewQrLogic, updateNewQrLogic, deleteNewQrLogic } from '../services/NewQrServices.js'

export const getNewQr = async (req: Request, res: Response) => {
    const id = req.params.user_id;

    if(!id){
        return res.status(400).json({success: false, message: "User id not found!"});
    }

    try {
        let response = await getNewQrLogic(id);
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

export const postNewQr = async(req: Request, res: Response)=>{
    const { user_id, name, qr_type, content, design, from_date , to_date, scan_limit, password, state } = req.body;
    
    if(!user_id || !name || !qr_type || !content || password){
        return res.status(400).json({success: false, message: "All fields required!"});
    }
    
    const newQrData = new NewQrModels({user_id, name, content, design, from_date, to_date, scan_limit, password, state});
    
    try {
        const response = await postNewQrLogic(newQrData);
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

export const updateNewQr = async(req: Request, res: Response)=>{
    const id = req.params.id;
    const {user_id, name, qr_type, content, design, from_date , to_date, scan_limit, password, state } = req.body;

    if(!id){
        return res.status(400).json({success: false, message: "QR id not found!"});
    }

    const newQrData = new NewQrModels({user_id, name, qr_type, content, design, from_date , to_date, scan_limit, password, state });
    
    try {
        let response = await updateNewQrLogic(id, newQrData);
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

export const deleteNewQr = async(req: Request, res: Response)=>{
    const {id} = req.params;    

    if(!id){
        return res.status(400).json({success: false, message: "NewQr id not found!"});
    }

    try {
        const response = await deleteNewQrLogic(id);
        if(response.success){
            return res.status(200).json(response);
        }else{
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal Server error!"});
    }
}
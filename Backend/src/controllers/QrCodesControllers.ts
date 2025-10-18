import { Request, Response } from "express";
import { QrModels } from '../models/QrCodesModels.js';
import { getQrLogic, postStaticQrLogic, postDynamicQrLogic, updateQrLogic, updateStatusLogic, deleteQrLogic } from '../services/QrCodesServices.js';

interface QrReqBody {
    user_id: string; 
    name: string;
    qr_type: string;
    content: object;
    design: object;
    configuration?: object;
}

interface QrReqParams {
    id?: number;
    ids?: number[];
}

export const getQr = async (req: Request, res: Response) => {
    const search = req.body.search || '';
    const sortBy = req.body.sortBy || '';
    const filterData = req.body.filterData || {activeStatus: [], selectedTypes: []};
    const uid = req.body.uid;
    const page = parseInt(req.body.page) || 0;
    const limit = parseInt(req.body.rowsPerPage) || 10;
    const offset = page * limit;

    if(!uid){
        return res.status(400).json({success: false, message: "User id not found!"});
    }

    try {
        let response = await getQrLogic(search, sortBy, filterData, uid, limit, offset);
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

export const postStaticQr = async (req: Request<{}, {}, QrReqBody>, res: Response) => {
    const { user_id, name, qr_type, content, design } = req.body;

    if(!user_id || !name || !qr_type || !content){
        return res.status(400).json({success: false, message: "Fill all the required fields!"});
    }

    const QrData = new QrModels({user_id, name, qr_type, content, design});

    try {
        const response = await postStaticQrLogic(QrData);
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

export const postDynamicQr = async (req: Request<{}, {}, QrReqBody>, res: Response)=>{
    const { user_id, name, qr_type, content, design, configuration } = req.body;
    
    if(!user_id || !name || !qr_type || !content){
        return res.status(400).json({success: false, message: "Fill all the required fields!"});
    }
    
    const QrData = new QrModels({user_id, name, qr_type, content, design, configuration});
    
    try {
        const response = await postDynamicQrLogic(QrData);
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

export const updateQr = async (req: Request<QrReqParams, {}, QrReqBody>, res: Response) => {
    const { ids } = req.params;
    const {user_id, name, qr_type, content, design, configuration } = req.body;

    if(!ids || !user_id || !name || !qr_type || !content){
        return res.status(400).json({success: false, message: "Fill all the required fields!"});
    }

    const QrData = new QrModels({user_id, name, qr_type, content, design, configuration});
    
    try {
        let response = await updateQrLogic(Number(ids), QrData);
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

export const updateStatus = async (req: Request, res: Response) => {
    const { ids, state } = req.body;

    if (!ids || ids.length === 0 || !state) {
        return res.status(400).json({ success: false, message: "No valid IDs or state provided!" });
    }

    try {
        const response = await updateStatusLogic(ids, state);
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

export const deleteQr = async(req: Request, res: Response) => {
    const { ids } = req.body;

    if (!ids || ids.length === 0) {
        return res.status(400).json({ success: false, message: "No valid IDs provided for deletion!" });
    }

    try {
        const response = await deleteQrLogic(ids);
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
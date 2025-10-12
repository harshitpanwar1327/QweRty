import { Request, Response } from "express";
import { NewQrModels } from '../models/QrCodesModels.js';
import { getNewQrLogic, postNewQrLogic, updateNewQrLogic, deleteNewQrLogic } from '../services/QrCodesServices.js';

interface NewQrReqBody {
    user_id: string; 
    name: string;
    qr_type: string;
    content: object;
    design: object;
    configuration: object;
}

interface NewQrReqParams {
    id?: string;
    uid?: string;
}

export const getNewQr = async (req: Request, res: Response) => {
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
        let response = await getNewQrLogic(search, sortBy, filterData, uid, limit, offset);
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

export const postNewQr = async(req: Request<{}, {}, NewQrReqBody>, res: Response)=>{
    const { user_id, name, qr_type, content, design, configuration } = req.body;
    
    if(!user_id || !name || !qr_type || !content){
        return res.status(400).json({success: false, message: "Fill all the required fields!"});
    }
    
    const newQrData = new NewQrModels({user_id, name, qr_type, content, design, configuration});
    
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

export const updateNewQr = async(req: Request<NewQrReqParams, {}, NewQrReqBody>, res: Response)=>{
    const { id } = req.params;
    const {user_id, name, qr_type, content, design, configuration } = req.body;

    if(!id || !user_id || !name || !qr_type || !content){
        return res.status(400).json({success: false, message: "Fill all the required fields!"});
    }

    const newQrData = new NewQrModels({user_id, name, qr_type, content, design, configuration});
    
    try {
        let response = await updateNewQrLogic(Number(id), newQrData);
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

export const deleteNewQr = async(req: Request<NewQrReqParams>, res: Response)=>{
    const { id } = req.params;    

    if(!id){
        return res.status(400).json({success: false, message: "Qr id not found!"});
    }

    try {
        const response = await deleteNewQrLogic(Number(id));
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
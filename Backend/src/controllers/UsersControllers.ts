import { UsersModels } from '../models/UsersModels.js'
import { registerUserLogic } from '../services/UsersServices.js'
import { Request, Response } from "express";

interface AuthenticationReqBody {
    name: string,
    email: string
}

export const registerUser = async (req: Request<{}, {}, AuthenticationReqBody>, res: Response) => {
    const {name, email} = req.body;

    if(!email || !name) {
        return res.status(400).json({success: false, message: "Fill all the required fields!"});
    }
    
    const userData = new UsersModels({name, email});

    try {
        const response = await registerUserLogic(userData);
        if(response.success) {
            return res.status(200).json(response);
        }else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error!"});
    }
}
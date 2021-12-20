import {Request, Response } from 'express';
import { UserModel } from '../models/user';



export const getUsers = async(req: Request, res: Response) => {
    res.status(200).json({
        ok: true
    });
}

export const createUser = async(req: Request, res: Response) => {
    
    const {name, password, email, role, areas} = req.body;
    
    const user = new UserModel({name, password, email, role, areas});

    user.save();
    
    res.status(201).json({
        ok: true,
        user
    });
}
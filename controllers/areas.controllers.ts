import {Request, Response } from 'express';
import { AreaModel } from '../models/area';



export const getAreas = async(req: Request, res: Response) => {
    res.status(200).json({
        ok: true
    });
}

export const createArea = async(req: Request, res: Response) => {
    
    const {name} = req.body;
    
    const area = new AreaModel({name});

    area.save();
    
    res.status(201).json({
        ok: true,
        area
    });
}
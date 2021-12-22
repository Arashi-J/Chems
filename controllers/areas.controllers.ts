import {Request, Response } from 'express';
import { AreaModel } from '../models/area';



export const getAreas = async(req: Request, res: Response) => {
    res.status(200).json({
        ok: true
    });
}

export const createArea = async(req: Request, res: Response) => {
    
    const {area, chemicals} = req.body;
    
    const newArea = new AreaModel({area, chemicals});

    newArea.save();
    
    res.status(201).json({
        area
    });
}
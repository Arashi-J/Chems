import { join } from 'path';
import { existsSync } from 'fs';
import { Request, Response } from 'express';
import { PpeModel } from '../models/ppe';

export const getPpes = async (req: Request, res: Response) => {

    const { resultsLimit = 10, searchFrom = 0 } = req.query;

    const ppes = await PpeModel.find()
        .skip(Number(searchFrom))
        .limit(Number(resultsLimit))

    const totalPpe = await PpeModel.countDocuments();

    return res.status(200).json({
        ppes,
        totalPpe
    });
}

export const getPpe = async (req: Request, res: Response) => {
    const { id } = req.params;

    const ppe = await PpeModel.findById(id)

    if (ppe) {
        return res.status(200).json({
            ppe
        });
    }
    return res.status(404).json({
        msg: 'EPP no encontrado'
    });
}

export const showPpeIcon = async (req: Request, res: Response) => {
    const { id } = req.params;

    const ppe = await PpeModel.findById(id);

    if (!ppe) {
        return res.status(404).json({
            msg: 'EPP no encontrado'
        });
    }
    return res.redirect(ppe.img);
}
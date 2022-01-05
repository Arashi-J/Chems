import { Request, Response } from 'express';
import { HazardModel } from '../models/hazard';

export const getHazards = async (req: Request, res: Response) => {

    const { resultsLimit = 10, searchFrom = 0 } = req.query;

    const hazards = await HazardModel.find()
        .skip(Number(searchFrom))
        .limit(Number(resultsLimit))

    const totalHazards = await HazardModel.countDocuments();

    return res.status(200).json({
        hazards,
        totalHazards
    });
}

export const getHazard = async (req: Request, res: Response) => {
    const { id } = req.params;

    const hazard = await HazardModel.findById(id)

    if (hazard) {
        return res.status(200).json({
            hazard
        });
    }
    return res.status(404).json({
        msg: 'Peligro no encontrado'
    });
}


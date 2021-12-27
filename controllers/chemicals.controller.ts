import { Request, Response } from 'express';
import { ChemicalModel } from '../models/chemical';

export const getChemicals = async (req: Request, res: Response) => {
    const { resultsLimit = 10, searchFrom = 0, chemicalStatus = 'all' } = req.query;

    const query = chemicalStatus === 'active' ? { status: true } :
        chemicalStatus === 'inactive' ? { status: false } : {}

    const chemicals = await ChemicalModel.find(query)
        .skip(Number(searchFrom))
        .limit(Number(resultsLimit))
        .populate('hazards', 'hazard')
        .populate('ppes', 'ppe');

    const totalChemicals = await ChemicalModel.countDocuments(query);

    return res.status(200).json({
        chemicals,
        totalChemicals
    });
}
export const getChemical = async (req: Request, res: Response) => {
    const { id } = req.params;

    const chemical = await ChemicalModel.findById(id);

    if (chemical) {
        return res.status(200).json({
            chemical
        });
    }

    return res.status(404).json({
        msg: 'Sustancia química no encontrada'
    })
}
export const createChemical = async (req: Request, res: Response) => {
    const { chemical, hazards, providers, manufacturers, pPhrases, hPhrases, ppe } = req.body;

    const newChemical = new ChemicalModel({
        chemical,
        hazards,
        providers,
        manufacturers,
        pPhrases,
        hPhrases,
        ppe
    });

    newChemical.save();

    return res.status(201).json({
        newChemical
    });

}

export const updateChemical = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {_id, __v, ...newChemicalData } = req.body;

    const chemical = await ChemicalModel.findByIdAndUpdate(id, newChemicalData, {new: true});

    return res.status(202).json({
        chemical
    });
}
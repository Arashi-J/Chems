import { Request, Response } from 'express';
import { ChemicalModel } from '../models/chemical';
import { textNormalizer } from '../helpers/text-normalizer';

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

    const chemical = await ChemicalModel.findById(id)
        .populate('hazards', 'hazard')
        .populate('ppes', 'ppe');

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
    const { chemical, hazards, providers, manufacturers, pPhrases, hPhrases, ppes } = req.body;

    const newChemical = new ChemicalModel({
        chemical,
        hazards,
        providers,
        manufacturers,
        pPhrases,
        hPhrases,
        ppes
    });

    newChemical.chemical = textNormalizer(newChemical.chemical);

    newChemical.save();

    return res.status(201).json({
        newChemical
    });

}
export const updateChemical = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { _id, __v, ...newChemicalData } = req.body;

    if (newChemicalData.chemical) {
        newChemicalData.chemical = textNormalizer(newChemicalData.chemical);
    }

    const chemical = await ChemicalModel.findByIdAndUpdate(id, newChemicalData, { new: true });

    return res.status(202).json({
        chemical
    });
}
export const approveChemical = async (req: any, res: Response) => {
    const { id } = req.params;

    const user = req.user;

    const approval = {}

    if (user.role === 'fsms_approver') {
        const chemical = await ChemicalModel.findByIdAndUpdate(id, { fsms: true }, { new: true });
        return res.status(202).json({
            chemical,
            user
        });
    } else if (user.role === 'ems_approver') {
        const chemical = await ChemicalModel.findByIdAndUpdate(id, { ems: true }, { new: true });
        return res.status(202).json({
            chemical,
            user
        });
    } else if (user.role === 'oshms_approver') {
        const chemical = await ChemicalModel.findByIdAndUpdate(id, { oshms: true }, { new: true });
        return res.status(202).json({
            chemical,
            user
        });
    } else {
        return res.status(400).json({
            msg: 'El usuario no tiene el rol requerido para realizar esta ación'
        });
    }


}
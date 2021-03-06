import { Request, Response } from 'express';

import { ChemicalModel } from '../models/chemical';
import { textNormalizer } from '../helpers/text-normalizers';

export const getChemicals = async (req: Request, res: Response) => {
    const { resultsLimit = 10, searchFrom = 0, chemicalStatus = 'all' } = req.query;

    const query = chemicalStatus === 'active' ? { status: true } :
        chemicalStatus === 'inactive' ? { status: false } : {}

    const chemicals = await ChemicalModel.find(query)
        .skip(Number(searchFrom))
        .limit(Number(resultsLimit))
        .populate('hazards', 'hazard')
        .populate('ppes', 'ppe')
        .populate('fsms.approver', 'name')
        .populate('ems.approver', 'name')
        .populate('oshms.approver', 'name')
        .populate('lastUpdatedBy', 'name');

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
        .populate('ppes', 'ppe')
        .populate('fsms.approver', 'name')
        .populate('ems.approver', 'name')
        .populate('oshms.approver', 'name')
        .populate('lastUpdatedBy', 'name');

    return res.status(200).json({
        chemical
    });

}
export const createChemical = async (req: any, res: Response) => {
    const {
        chemical,
        hazards,
        providers,
        manufacturers,
        pPhrases,
        hPhrases,
        ppes,
        sds,
        status
    } = req.body;

    const newChemical = new ChemicalModel({
        chemical: textNormalizer(chemical),
        hazards,
        providers,
        manufacturers,
        pPhrases,
        hPhrases,
        ppes,
        sds,
        status,
        lastUpdatedBy: req.user._id
    });

    if (newChemical.sds.language) {
        newChemical.sds.language = newChemical.sds.language.toLowerCase()
    }

    newChemical.save();

    return res.status(201).json({
        newChemical
    });

}
export const updateChemical = async (req: any, res: Response) => {
    const { id } = req.params;
    const { _id, __v, fsms, ems, oshms, ...newChemicalData } = req.body;


    if (Object.keys(newChemicalData).length === 0) {
        return res.status(400).json({
            msg: 'No se recibieron datos para actualizar'
        });
    }
    newChemicalData.lastUpdatedBy = req.user._id;
    newChemicalData.lastUpdateDate = Date.now();

    if (newChemicalData.chemical) {
        newChemicalData.chemical = textNormalizer(newChemicalData.chemical);
    }

    const chemical = await ChemicalModel.findByIdAndUpdate(id, newChemicalData, { new: true })
        .populate('hazards', 'hazard')
        .populate('ppes', 'ppe')
        .populate('fsms.approver', 'name')
        .populate('ems.approver', 'name')
        .populate('oshms.approver', 'name')
        .populate('lastUpdatedBy', 'name');

    return res.status(202).json({
        chemical
    });
}
export const approveChemical = async (req: any, res: Response) => {
    const { id } = req.params;

    const { role } = req.user;


    if (role === 'fsms_approver') {

        const fsms = {
            approval: true,
            approver: req.user._id,
            approvalDate: Date.now()
        }

        const Chemical = await ChemicalModel.findByIdAndUpdate(id, { fsms }, { new: true })
            .populate('fsms.approver', 'name');


        return res.status(202).json({
            Chemical
        });
    } else if (role === 'ems_approver') {

        const ems = {
            approval: true,
            approver: req.user._id,
            approvalDate: Date.now()
        }

        const chemical = await ChemicalModel.findByIdAndUpdate(id, { ems }, { new: true })
            .populate('ems.approver', 'name');

        return res.status(202).json({
            chemical
        });
    } else if (role === 'oshms_approver') {

        const oshms = {
            approval: true,
            approver: req.user._id,
            approvalDate: Date.now()
        }

        const chemical = await ChemicalModel.findByIdAndUpdate(id, { oshms }, { new: true })
            .populate('oshms.approver', 'name');

        return res.status(202).json({
            chemical
        });
    } else {
        return res.status(400).json({
            msg: 'El usuario no tiene el rol requerido para realizar esta aci??n'
        });
    }


}
import { Request, Response } from 'express';
import { AreaModel } from '../models/area';
import { textNormalizer, titleCase } from '../helpers/text-normalizers';


//List areas
export const getAreas = async (req: Request, res: Response) => {

    const { resultsLimit = 10, searchFrom = 0, areaStatus = 'all' } = req.query;

    const query = areaStatus === 'active' ? { status: true } :
        areaStatus === 'inactive' ? { status: false } : {}

    const areas = await AreaModel.find(query)
        .skip(Number(searchFrom))
        .limit(Number(resultsLimit))
        .populate('chemicals', 'chemical')
        .populate('lastUpdatedBy', 'name');

    const totalAreas = await AreaModel.countDocuments(query);

    return res.status(200).json({
        areas,
        totalAreas
    });
}
//Look for area by id
export const getArea = async (req: Request, res: Response) => {
    const { id } = req.params;

    const area = await AreaModel.findById(id)
        .populate('chemicals', 'chemical')
        .populate('lastUpdatedBy', 'name');

    if (area) {
        return res.status(200).json({
            area
        });
    }
    return res.status(404).json({
        msg: 'Área no encontrada'
    });
}

//Create area
export const createArea = async (req: any, res: Response) => {

    const { area, chemicals, leader } = req.body;

    const newArea = new AreaModel({
        area: textNormalizer(area),
        chemicals,
        leader: titleCase(leader),
        lastUpdatedBy: req.user._id
    });
    await newArea.save();

    return res.status(201).json({
        newArea
    });
}

//Update area
export const updateArea = async (req: any, res: Response) => {

    const { id } = req.params;
    const { _id, __v, ...newAreaData } = req.body;

    if (Object.keys(newAreaData).length === 0) {
        return res.status(400).json({
            msg: 'No se recibieron datos para actualizar'
        });
    }
    if (newAreaData.area) {
        newAreaData.area = textNormalizer(newAreaData.area);
    }
    newAreaData.lastUpdatedBy = req.user._id;
    newAreaData.lastUpdateDate = Date.now();

    const area = await AreaModel.findByIdAndUpdate(id, newAreaData, { new: true })
        .populate('chemicals', 'chemical')
        .populate('lastUpdatedBy', 'name');

    return res.status(202).json({
        area
    });
}

//Update area's chemicals
export const updateAreaChemicals = async (req: any, res: Response) => {

    const { id } = req.params;
    const { chemicals } = req.body;

    if (!chemicals || chemicals.length === 0) {
        return res.status(400).json({
            msg: 'No se recibieron datos para actualizar'
        });
    }

    const lastUpdatedBy = req.user._id;
    const lastUpdateDate = Date.now();

    const area = await AreaModel.findByIdAndUpdate(id, { chemicals, lastUpdatedBy, lastUpdateDate }, { new: true })
        .populate('chemicals', 'chemical')
        .populate('lastUpdatedBy', 'name');

    return res.status(202).json({
        area
    });
}


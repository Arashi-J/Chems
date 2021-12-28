import { Request, Response } from 'express';
import { AreaModel } from '../models/area';
import { textNormalizer } from '../helpers/text-normalizer';


//List areas
export const getAreas = async (req: Request, res: Response) => {

    const { resultsLimit = 10, searchFrom = 0, areaStatus = 'all' } = req.query;

    const query = areaStatus === 'active' ? { status: true } :
        areaStatus === 'inactive' ? { status: false } : {}

    const areas = await AreaModel.find(query)
        .skip(Number(searchFrom))
        .limit(Number(resultsLimit))
        .populate('chemicals', 'chemical');

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
        .populate('chemicals', 'chemical');
        
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
export const createArea = async (req: Request, res: Response) => {

    const { area, chemicals } = req.body;

    const newArea = new AreaModel({ area, chemicals });

    //Area name normalization
    newArea.area = textNormalizer(newArea.area);

    await newArea.save();

    return res.status(201).json({
        newArea
    });
}

//Update area

export const updateArea = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { _id, __v, ...newAreaData } = req.body;

    //Area name normalization
    if (newAreaData.area) {
        newAreaData.area = textNormalizer(newAreaData.area);
    }


    const area = await AreaModel.findByIdAndUpdate(id, newAreaData, { new: true })

    return res.status(202).json({
        area
    });
}
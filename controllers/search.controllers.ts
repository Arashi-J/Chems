import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { AreaModel } from '../models/area';
import { ChemicalModel } from '../models/chemical';
import { HazardModel } from '../models/hazard';
import { PpeModel } from '../models/ppe';
import { UserModel } from '../models/user';

const collections: string[] = ['users', 'areas', 'chemicals', 'hazards', 'ppes']

const searchAreas = async (term: string, status: string, res: Response) => {
    if (isValidObjectId(term)) {
        const area = await AreaModel.findById(term)
            .populate('chemicals', 'chemical')
            .populate('lastUpdatedBy', 'name');;

        return res.json({
            results: (area) ? [area] : []
        });
    }

    const queryStatus = status === 'active' ? { status: true } :
        status === 'inactive' ? { status: false } : {}

    const regex = new RegExp(term, 'i');

    const areas = await AreaModel.find({
        $or: [{ area: regex }],
        $and: [queryStatus]
    }).populate('chemicals', 'chemical').populate('lastUpdatedBy', 'name');

    const counter = await AreaModel.count({
        $or: [{ area: regex }],
        $and: [queryStatus]
    });

    res.json({
        results: areas,
        total: counter
    });
}

const searchChemicals = async (term: string, status: string, res: Response) => {

    if (isValidObjectId(term)) {
        const chemical = await ChemicalModel.findById(term)
            .populate('hazards', 'hazard')
            .populate('ppes', 'ppe')
            .populate('fsms.approver', 'name')
            .populate('ems.approver', 'name')
            .populate('oshms.approver', 'name')
            .populate('lastUpdatedBy', 'name');
        return res.json({
            results: (chemical) ? [chemical] : []
        });
    }

    const queryStatus = status === 'active' ? { status: true } :
        status === 'inactive' ? { status: false } : {}

    const regex = new RegExp(term, 'i');

    const chemicals = await ChemicalModel.find({
        $or: [{ chemical: regex }],
        $and: [queryStatus]
    }).populate('hazards', 'hazard')
        .populate('ppes', 'ppe')
        .populate('fsms.approver', 'name')
        .populate('ems.approver', 'name')
        .populate('oshms.approver', 'name')
        .populate('lastUpdatedBy', 'name');

    const counter = await ChemicalModel.count({
        $or: [{ chemical: regex }],
        $and: [queryStatus]
    });

    res.json({
        results: chemicals,
        total: counter
    });
}

const searchHazards = async (term: string, res: Response) => {

    if (isValidObjectId(term)) {
        const hazard = await HazardModel.findById(term);
        return res.json({
            results: (hazard) ? [hazard] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const hazards = await HazardModel.find({
        $or: [{ hazard: regex }, { code: regex }]
    });

    const counter = await HazardModel.count({
        $or: [{ hazard: regex }, { code: regex }]
    });

    res.json({
        results: hazards,
        total: counter
    });
}

const searchPpes = async (term: string, res: Response) => {

    if (isValidObjectId(term)) {
        const ppe = await PpeModel.findById(term);
        return res.json({
            results: (ppe) ? [ppe] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const ppes = await PpeModel.find({ ppe: regex });

    const counter = await PpeModel.count({ ppe: regex });

    res.json({
        results: ppes,
        total: counter
    });
}


const searchUsers = async (term: string, status: string, res: Response) => {
    if (isValidObjectId(term)) {
        const user = await UserModel.findById(term)
            .populate('areas', 'area')
            .populate('lastUpdatedBy', 'name');

        return res.json({
            results: (user) ? [user] : []
        });
    }

    const queryStatus = status === 'active' ? { status: true } :
        status === 'inactive' ? { status: false } : {}

    const regex = new RegExp(term, 'i');

    const users = await UserModel.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [queryStatus]
    }).populate('areas', 'area').populate('lastUpdatedBy', 'name');

    const counter = await UserModel.count({
        $or: [{ name: regex }, { email: regex }],
        $and: [queryStatus]
    });

    res.json({
        results: users,
        total: counter
    });
}



export const search = (req: Request, res: Response) => {

    const { collection, term } = req.params;
    const { status = 'all' } = req.query;

    const validStatus = ['all', 'active', 'inactive']

    if (!collections.includes(collection)) {
        return res.status(400).json({
            msg: `No se ha indicado una colección correcta para la búsqueda. Colecciones permitidas: ${ collections }`
        });
    }
    if (typeof (status) !== 'string' || !validStatus.includes(status)) {
        return res.status(400).json({
            msg: `Error en el parámetro de búsqueda status. Debe ser : ${ validStatus }`
        });
    }

    switch (collection) {
        case 'users':
            searchUsers(term, status, res);
            break;

        case 'areas':
            searchAreas(term, status, res);
            break;

        case 'chemicals':
            searchChemicals(term, status, res);
            break;
        case 'hazards':
            searchHazards(term, res);
            break;
        case 'ppes':
            searchPpes(term, res);
            break;

        default:
            res.status(500).json({
                msg: `La búsqueda en la colección ${ collection } no se encuentra disponible actualmente`
            });
    }
}


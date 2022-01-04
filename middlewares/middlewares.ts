import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ChemicalModel } from '../models/chemical';


export const requestValidator = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}

export const roleValidator = (...roles: string[]) => {

    return (req: any, res: Response, next: NextFunction) => {

        if (!req.user) {
            return res.status(400).json({
                msg: 'No hay usuario autenticado para validar el rol'
            });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(400).json({
                msg: `El usuario no tiene uno de roles requeridos para realizar la petición. Roles permitidos: ${ roles }`
            });
        }
        next();
    }
}

export const areaValidator = (req: any, res: Response, next: NextFunction) => {

    if (!req.user) {
        return res.status(400).json({
            msg: 'No hay usuario autenticado para validar el área'
        });
    }

    const { id } = req.params;

    const areas = req.user.areas.toString().split(',')

    if (req.user.role !== 'admin' && !areas.includes(id)) {
        return res.status(400).json({
            msg: 'El usuario no tiene asignado el área a actualizar asignada o no es administrador',
            id,
            user: req.user
        });
    }
    next();
}

export const chemApprovalValidation = async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const { role } = req.user;

    const chemical = ((await ChemicalModel.findById(id))) as any;

    if (role === 'fsms_approver' && chemical.fsms.approval) {
        return res.status(400).json({
            msg: 'La sustancia química ya fue aprobada por el SGIA'
        });
    } else if (role === 'ems_approver' && chemical.ems.approval) {
        return res.status(400).json({
            msg: 'La sustancia química ya fue aprobada por el SGA'
        });
    } else if (role === 'oshms_approver' && chemical.oshms.approval) {
        return res.status(400).json({
            msg: 'La sustancia química ya fue aprobada por el SGSST'
        });
    }
    next();
}



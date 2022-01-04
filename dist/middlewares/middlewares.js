"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chemApprovalValidation = exports.areaValidator = exports.roleValidator = exports.requestValidator = void 0;
const express_validator_1 = require("express-validator");
const chemical_1 = require("../models/chemical");
const requestValidator = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
exports.requestValidator = requestValidator;
const roleValidator = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(400).json({
                msg: 'No hay usuario autenticado para validar el rol'
            });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(400).json({
                msg: `El usuario no tiene uno de roles requeridos para realizar la petición. Roles permitidos: ${roles}`
            });
        }
        next();
    };
};
exports.roleValidator = roleValidator;
const areaValidator = (req, res, next) => {
    if (!req.user) {
        return res.status(400).json({
            msg: 'No hay usuario autenticado para validar el área'
        });
    }
    const { id } = req.params;
    const areas = req.user.areas.toString().split(',');
    if (req.user.role !== 'admin' && !areas.includes(id)) {
        return res.status(400).json({
            msg: 'El usuario no tiene asignado el área a actualizar asignada o no es administrador',
            id,
            user: req.user
        });
    }
    next();
};
exports.areaValidator = areaValidator;
const chemApprovalValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { role } = req.user;
    const chemical = ((yield chemical_1.ChemicalModel.findById(id)));
    if (role === 'fsms_approver' && chemical.fsms.approval) {
        return res.status(400).json({
            msg: 'La sustancia química ya fue aprobada por el SGIA'
        });
    }
    else if (role === 'ems_approver' && chemical.ems.approval) {
        return res.status(400).json({
            msg: 'La sustancia química ya fue aprobada por el SGA'
        });
    }
    else if (role === 'oshms_approver' && chemical.oshms.approval) {
        return res.status(400).json({
            msg: 'La sustancia química ya fue aprobada por el SGSST'
        });
    }
    next();
});
exports.chemApprovalValidation = chemApprovalValidation;
//# sourceMappingURL=middlewares.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areaValidator = exports.roleValidator = exports.requestValidator = void 0;
const express_validator_1 = require("express-validator");
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
//# sourceMappingURL=middlewares.js.map
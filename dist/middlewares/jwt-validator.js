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
exports.jwtValidator = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = require("../models/user");
const jwtValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('jtkn');
    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }
    try {
        const { uid } = (0, jsonwebtoken_1.verify)(token, process.env.JWTK);
        const user = yield user_1.UserModel.findById(uid);
        if (!user) {
            return res.status(401).json({
                msg: 'Usuario no encuentrado en Base de Datos'
            });
        }
        if (!user.status) {
            return res.status(401).json({
                msg: 'Usuario inahibilitado'
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token inválido'
        });
    }
});
exports.jwtValidator = jwtValidator;
//# sourceMappingURL=jwt-validator.js.map
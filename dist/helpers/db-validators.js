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
exports.validArea = exports.validRole = exports.existingArea = exports.existingEmail = void 0;
const area_1 = require("../models/area");
const role_1 = require("../models/role");
const user_1 = require("../models/user");
const existingEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEmail = yield user_1.UserModel.findOne({ email });
    if (!existingEmail) {
        throw new Error(`El correo electrónico ${email} ya se encuentra en uso`);
    }
});
exports.existingEmail = existingEmail;
const existingArea = (area) => __awaiter(void 0, void 0, void 0, function* () {
    const existingArea = yield area_1.AreaModel.findOne({ area });
    if (!existingArea) {
        throw new Error(`El área ${area} ya existe`);
    }
});
exports.existingArea = existingArea;
const validRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const validRole = yield role_1.RoleModel.findOne({ role });
    if (!validRole) {
        throw new Error(`El rol de usuario ${role} no es válido`);
    }
});
exports.validRole = validRole;
const validArea = (areas) => {
    areas.forEach((area) => __awaiter(void 0, void 0, void 0, function* () {
        const validArea = yield area_1.AreaModel.findOne({ area });
        if (!validArea) {
            throw new Error(`El área ${area} no existe en el catalogo`);
        }
    }));
};
exports.validArea = validArea;
//# sourceMappingURL=db-validators.js.map
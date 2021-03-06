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
exports.validPpes = exports.validHazards = exports.validChemicals = exports.validAreas = exports.validRole = exports.existingChemical = exports.existingArea = exports.existingEmail = exports.existingChemicalId = exports.existingAreaId = exports.existingUserId = void 0;
const area_1 = require("../models/area");
const role_1 = require("../models/role");
const user_1 = require("../models/user");
const chemical_1 = require("../models/chemical");
const text_normalizers_1 = require("./text-normalizers");
const hazard_1 = require("../models/hazard");
const ppe_1 = require("../models/ppe");
const mongoose_1 = require("mongoose");
const existingUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_1.UserModel.findById(id);
    if (!existingUser) {
        throw new Error(`Èl usuario con id ${id} no existe`);
    }
});
exports.existingUserId = existingUserId;
const existingAreaId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingArea = yield area_1.AreaModel.findById(id);
    if (!existingArea) {
        throw new Error(`Èl área con id ${id} no existe`);
    }
});
exports.existingAreaId = existingAreaId;
const existingChemicalId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingChemical = yield chemical_1.ChemicalModel.findById(id);
    if (!existingChemical) {
        throw new Error(`Èl químico con id ${id} no existe`);
    }
});
exports.existingChemicalId = existingChemicalId;
const existingEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    email = email.toLowerCase();
    const existingEmail = yield user_1.UserModel.findOne({ email });
    if (existingEmail) {
        throw new Error(`El correo electrónico ${email} ya se encuentra en uso`);
    }
});
exports.existingEmail = existingEmail;
const existingArea = (area) => __awaiter(void 0, void 0, void 0, function* () {
    area = (0, text_normalizers_1.textNormalizer)(area);
    const existingArea = yield area_1.AreaModel.findOne({ area });
    if (existingArea) {
        throw new Error(`El área ${area} ya existe`);
    }
});
exports.existingArea = existingArea;
const existingChemical = (chemical) => __awaiter(void 0, void 0, void 0, function* () {
    chemical = (0, text_normalizers_1.textNormalizer)(chemical);
    const existingChemical = yield chemical_1.ChemicalModel.findOne({ chemical });
    if (existingChemical) {
        throw new Error(`La sustancia química con nombre: ${chemical} ya existe`);
    }
});
exports.existingChemical = existingChemical;
const validRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const validRole = yield role_1.RoleModel.findOne({ role: role.trim().toLowerCase() });
    if (!validRole) {
        throw new Error(`El rol de usuario ${role} no es válido`);
    }
});
exports.validRole = validRole;
const validAreas = (areas) => __awaiter(void 0, void 0, void 0, function* () {
    if (areas === []) {
        return;
    }
    else {
        for (const areaId of areas) {
            if (!(0, mongoose_1.isValidObjectId)(areaId)) {
                throw new Error(`El valor ${areaId} no es un id de MongoDB válido`);
            }
            const validArea = yield area_1.AreaModel.findById(areaId);
            if (!validArea) {
                throw new Error(`El área con el id ${areaId} no existe en el catalogo`);
            }
        }
    }
});
exports.validAreas = validAreas;
const validChemicals = (chemicals = []) => __awaiter(void 0, void 0, void 0, function* () {
    if (chemicals === []) {
        return;
    }
    else {
        for (const chemicalId of chemicals) {
            if (!(0, mongoose_1.isValidObjectId)(chemicalId)) {
                throw new Error(`El valor ${chemicalId} no es un id de MongoDB válido`);
            }
            const validChemical = yield chemical_1.ChemicalModel.findById(chemicalId);
            if (!validChemical) {
                throw new Error(`El sustancia química con el id ${chemicalId} no existe en el catalogo`);
            }
        }
    }
});
exports.validChemicals = validChemicals;
const validHazards = (hazards = []) => __awaiter(void 0, void 0, void 0, function* () {
    for (const hazardId of hazards) {
        if (!(0, mongoose_1.isValidObjectId)(hazardId)) {
            throw new Error(`El valor ${hazardId} no es un id de MongoDB válido`);
        }
        const validHazard = yield hazard_1.HazardModel.findById(hazardId);
        if (!validHazard) {
            throw new Error(`El peligro con el id ${hazardId} no existe en el catalogo`);
        }
    }
});
exports.validHazards = validHazards;
const validPpes = (ppes = []) => __awaiter(void 0, void 0, void 0, function* () {
    for (const ppedId of ppes) {
        if (!(0, mongoose_1.isValidObjectId)(ppedId)) {
            throw new Error(`El valor ${ppedId} no es un id de MongoDB válido`);
        }
        const validChemical = yield ppe_1.PpeModel.findById(ppedId);
        if (!validChemical) {
            throw new Error(`El EPP con el id ${ppedId} no existe en el catalogo`);
        }
    }
});
exports.validPpes = validPpes;
//# sourceMappingURL=db-validators.js.map
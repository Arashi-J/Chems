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
exports.search = void 0;
const mongoose_1 = require("mongoose");
const area_1 = require("../models/area");
const chemical_1 = require("../models/chemical");
const hazard_1 = require("../models/hazard");
const ppe_1 = require("../models/ppe");
const user_1 = require("../models/user");
const collections = ['users', 'areas', 'chemicals', 'hazards', 'ppes'];
const searchAreas = (term, status, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, mongoose_1.isValidObjectId)(term)) {
        const area = yield area_1.AreaModel.findById(term)
            .populate('chemicals', 'chemical')
            .populate('lastUpdatedBy', 'name');
        ;
        return res.json({
            results: (area) ? [area] : []
        });
    }
    const queryStatus = status === 'active' ? { status: true } :
        status === 'inactive' ? { status: false } : {};
    const regex = new RegExp(term, 'i');
    const areas = yield area_1.AreaModel.find({
        $or: [{ area: regex }],
        $and: [queryStatus]
    }).populate('chemicals', 'chemical').populate('lastUpdatedBy', 'name');
    const counter = yield area_1.AreaModel.count({
        $or: [{ area: regex }],
        $and: [queryStatus]
    });
    res.json({
        results: areas,
        total: counter
    });
});
const searchChemicals = (term, status, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, mongoose_1.isValidObjectId)(term)) {
        const chemical = yield chemical_1.ChemicalModel.findById(term)
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
        status === 'inactive' ? { status: false } : {};
    const regex = new RegExp(term, 'i');
    const chemicals = yield chemical_1.ChemicalModel.find({
        $or: [{ chemical: regex }],
        $and: [queryStatus]
    }).populate('hazards', 'hazard')
        .populate('ppes', 'ppe')
        .populate('fsms.approver', 'name')
        .populate('ems.approver', 'name')
        .populate('oshms.approver', 'name')
        .populate('lastUpdatedBy', 'name');
    const counter = yield chemical_1.ChemicalModel.count({
        $or: [{ chemical: regex }],
        $and: [queryStatus]
    });
    res.json({
        results: chemicals,
        total: counter
    });
});
const searchHazards = (term, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, mongoose_1.isValidObjectId)(term)) {
        const hazard = yield hazard_1.HazardModel.findById(term);
        return res.json({
            results: (hazard) ? [hazard] : []
        });
    }
    const regex = new RegExp(term, 'i');
    const hazards = yield hazard_1.HazardModel.find({
        $or: [{ hazard: regex }, { code: regex }]
    });
    const counter = yield hazard_1.HazardModel.count({
        $or: [{ hazard: regex }, { code: regex }]
    });
    res.json({
        results: hazards,
        total: counter
    });
});
const searchPpes = (term, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, mongoose_1.isValidObjectId)(term)) {
        const ppe = yield ppe_1.PpeModel.findById(term);
        return res.json({
            results: (ppe) ? [ppe] : []
        });
    }
    const regex = new RegExp(term, 'i');
    const ppes = yield ppe_1.PpeModel.find({ ppe: regex });
    const counter = yield ppe_1.PpeModel.count({ ppe: regex });
    res.json({
        results: ppes,
        total: counter
    });
});
const searchUsers = (term, status, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, mongoose_1.isValidObjectId)(term)) {
        const user = yield user_1.UserModel.findById(term)
            .populate('areas', 'area')
            .populate('lastUpdatedBy', 'name');
        return res.json({
            results: (user) ? [user] : []
        });
    }
    const queryStatus = status === 'active' ? { status: true } :
        status === 'inactive' ? { status: false } : {};
    const regex = new RegExp(term, 'i');
    const users = yield user_1.UserModel.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [queryStatus]
    }).populate('areas', 'area').populate('lastUpdatedBy', 'name');
    const counter = yield user_1.UserModel.count({
        $or: [{ name: regex }, { email: regex }],
        $and: [queryStatus]
    });
    res.json({
        results: users,
        total: counter
    });
});
const search = (req, res) => {
    const { collection, term } = req.params;
    const { status = 'all' } = req.query;
    const validStatus = ['all', 'active', 'inactive'];
    if (!collections.includes(collection)) {
        return res.status(400).json({
            msg: `No se ha indicado una colección correcta para la búsqueda. Colecciones permitidas: ${collections}`
        });
    }
    if (typeof (status) !== 'string' || !validStatus.includes(status)) {
        return res.status(400).json({
            msg: `Error en el parámetro de búsqueda status. Debe ser : ${validStatus}`
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
                msg: `La búsqueda en la colección ${collection} no se encuentra disponible actualmente`
            });
    }
};
exports.search = search;
//# sourceMappingURL=search.controllers.js.map
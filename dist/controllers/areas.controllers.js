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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAreaChemicals = exports.updateArea = exports.createArea = exports.getArea = exports.getAreas = void 0;
const area_1 = require("../models/area");
const text_normalizers_1 = require("../helpers/text-normalizers");
const getAreas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { resultsLimit = 10, searchFrom = 0, areaStatus = 'all' } = req.query;
    const query = areaStatus === 'active' ? { status: true } :
        areaStatus === 'inactive' ? { status: false } : {};
    const areas = yield area_1.AreaModel.find(query)
        .skip(Number(searchFrom))
        .limit(Number(resultsLimit))
        .populate('chemicals', 'chemical')
        .populate('lastUpdatedBy', 'name');
    const totalAreas = yield area_1.AreaModel.countDocuments(query);
    return res.status(200).json({
        areas,
        totalAreas
    });
});
exports.getAreas = getAreas;
const getArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const area = yield area_1.AreaModel.findById(id)
        .populate('chemicals', 'chemical')
        .populate('lastUpdatedBy', 'name');
    return res.status(200).json({
        area
    });
});
exports.getArea = getArea;
const createArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { area, chemicals, leader } = req.body;
    const newArea = new area_1.AreaModel({
        area: (0, text_normalizers_1.textNormalizer)(area),
        chemicals,
        leader: (0, text_normalizers_1.titleCase)(leader),
        lastUpdatedBy: req.user._id
    });
    yield newArea.save();
    return res.status(201).json({
        newArea
    });
});
exports.createArea = createArea;
const updateArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id, __v } = _a, newAreaData = __rest(_a, ["_id", "__v"]);
    if (Object.keys(newAreaData).length === 0) {
        return res.status(400).json({
            msg: 'No se recibieron datos para actualizar'
        });
    }
    if (newAreaData.area) {
        newAreaData.area = (0, text_normalizers_1.textNormalizer)(newAreaData.area);
    }
    newAreaData.lastUpdatedBy = req.user._id;
    newAreaData.lastUpdateDate = Date.now();
    const area = yield area_1.AreaModel.findByIdAndUpdate(id, newAreaData, { new: true })
        .populate('chemicals', 'chemical')
        .populate('lastUpdatedBy', 'name');
    return res.status(202).json({
        area
    });
});
exports.updateArea = updateArea;
const updateAreaChemicals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { chemicals } = req.body;
    if (!chemicals || chemicals.length === 0) {
        return res.status(400).json({
            msg: 'No se recibieron datos para actualizar'
        });
    }
    const lastUpdatedBy = req.user._id;
    const lastUpdateDate = Date.now();
    const area = yield area_1.AreaModel.findByIdAndUpdate(id, { chemicals, lastUpdatedBy, lastUpdateDate }, { new: true })
        .populate('chemicals', 'chemical')
        .populate('lastUpdatedBy', 'name');
    return res.status(202).json({
        area
    });
});
exports.updateAreaChemicals = updateAreaChemicals;
//# sourceMappingURL=areas.controllers.js.map
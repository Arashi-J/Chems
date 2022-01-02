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
const text_normalizer_1 = require("../helpers/text-normalizer");
//List areas
const getAreas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { resultsLimit = 10, searchFrom = 0, areaStatus = 'all' } = req.query;
    const query = areaStatus === 'active' ? { status: true } :
        areaStatus === 'inactive' ? { status: false } : {};
    const areas = yield area_1.AreaModel.find(query)
        .skip(Number(searchFrom))
        .limit(Number(resultsLimit))
        .populate('chemicals', 'chemical');
    const totalAreas = yield area_1.AreaModel.countDocuments(query);
    return res.status(200).json({
        areas,
        totalAreas
    });
});
exports.getAreas = getAreas;
//Look for area by id
const getArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const area = yield area_1.AreaModel.findById(id)
        .populate('chemicals', 'chemical');
    if (area) {
        return res.status(200).json({
            area
        });
    }
    return res.status(404).json({
        msg: 'Área no encontrada'
    });
});
exports.getArea = getArea;
//Create area
const createArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { area, chemicals } = req.body;
    const newArea = new area_1.AreaModel({ area, chemicals });
    //Area name normalization
    newArea.area = (0, text_normalizer_1.textNormalizer)(newArea.area);
    yield newArea.save();
    return res.status(201).json({
        newArea
    });
});
exports.createArea = createArea;
//Update area
const updateArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id, __v } = _a, newAreaData = __rest(_a, ["_id", "__v"]);
    //Area name normalization
    if (newAreaData.area) {
        newAreaData.area = (0, text_normalizer_1.textNormalizer)(newAreaData.area);
    }
    const area = yield area_1.AreaModel.findByIdAndUpdate(id, newAreaData, { new: true });
    return res.status(202).json({
        area
    });
});
exports.updateArea = updateArea;
//Update area's chemicals
const updateAreaChemicals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { chemicals } = req.body;
    const area = yield area_1.AreaModel.findByIdAndUpdate(id, { chemicals }, { new: true });
    return res.status(202).json({
        area
    });
});
exports.updateAreaChemicals = updateAreaChemicals;
//# sourceMappingURL=areas.controllers.js.map
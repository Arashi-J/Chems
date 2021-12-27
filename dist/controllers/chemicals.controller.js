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
exports.updateChemical = exports.createChemical = exports.getChemical = exports.getChemicals = void 0;
const chemical_1 = require("../models/chemical");
const getChemicals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { resultsLimit = 10, searchFrom = 0, chemicalStatus = 'all' } = req.query;
    const query = chemicalStatus === 'active' ? { status: true } :
        chemicalStatus === 'inactive' ? { status: false } : {};
    const chemicals = yield chemical_1.ChemicalModel.find(query)
        .skip(Number(searchFrom))
        .limit(Number(resultsLimit))
        .populate('hazards', 'hazard')
        .populate('ppes', 'ppe');
    const totalChemicals = yield chemical_1.ChemicalModel.countDocuments(query);
    return res.status(200).json({
        chemicals,
        totalChemicals
    });
});
exports.getChemicals = getChemicals;
const getChemical = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const chemical = yield chemical_1.ChemicalModel.findById(id);
    if (chemical) {
        return res.status(200).json({
            chemical
        });
    }
    return res.status(404).json({
        msg: 'Sustancia química no encontrada'
    });
});
exports.getChemical = getChemical;
const createChemical = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chemical, hazards, providers, manufacturers, pPhrases, hPhrases, ppe } = req.body;
    const newChemical = new chemical_1.ChemicalModel({
        chemical,
        hazards,
        providers,
        manufacturers,
        pPhrases,
        hPhrases,
        ppe
    });
    newChemical.save();
    return res.status(201).json({
        newChemical
    });
});
exports.createChemical = createChemical;
const updateChemical = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id, __v } = _a, newChemicalData = __rest(_a, ["_id", "__v"]);
    const chemical = yield chemical_1.ChemicalModel.findByIdAndUpdate(id, newChemicalData, { new: true });
    return res.status(202).json({
        chemical
    });
});
exports.updateChemical = updateChemical;
//# sourceMappingURL=chemicals.controller.js.map
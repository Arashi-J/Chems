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
exports.showHazardPictogram = exports.getHazard = exports.getHazards = void 0;
const hazard_1 = require("../models/hazard");
const getHazards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { resultsLimit = 10, searchFrom = 0 } = req.query;
    const hazards = yield hazard_1.HazardModel.find()
        .skip(Number(searchFrom))
        .limit(Number(resultsLimit));
    const totalHazards = yield hazard_1.HazardModel.countDocuments();
    return res.status(200).json({
        hazards,
        totalHazards
    });
});
exports.getHazards = getHazards;
const getHazard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const hazard = yield hazard_1.HazardModel.findById(id);
    if (hazard) {
        return res.status(200).json({
            hazard
        });
    }
    return res.status(404).json({
        msg: 'Peligro no encontrado'
    });
});
exports.getHazard = getHazard;
const showHazardPictogram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const hazard = yield hazard_1.HazardModel.findById(id);
    if (!hazard) {
        return res.status(404).json({
            msg: 'Peligro no encontrado'
        });
    }
    return res.redirect(hazard.pictogram);
});
exports.showHazardPictogram = showHazardPictogram;
//# sourceMappingURL=hazards.controllers.js.map
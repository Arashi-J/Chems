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
exports.showPpeIcon = exports.getPpe = exports.getPpes = void 0;
const ppe_1 = require("../models/ppe");
const getPpes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { resultsLimit = 10, searchFrom = 0 } = req.query;
    const ppes = yield ppe_1.PpeModel.find()
        .skip(Number(searchFrom))
        .limit(Number(resultsLimit));
    const totalPpe = yield ppe_1.PpeModel.countDocuments();
    return res.status(200).json({
        ppes,
        totalPpe
    });
});
exports.getPpes = getPpes;
const getPpe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const ppe = yield ppe_1.PpeModel.findById(id);
    if (ppe) {
        return res.status(200).json({
            ppe
        });
    }
    return res.status(404).json({
        msg: 'EPP no encontrado'
    });
});
exports.getPpe = getPpe;
const showPpeIcon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const ppe = yield ppe_1.PpeModel.findById(id);
    if (!ppe) {
        return res.status(404).json({
            msg: 'EPP no encontrado'
        });
    }
    return res.redirect(ppe.img);
});
exports.showPpeIcon = showPpeIcon;
//# sourceMappingURL=ppes.controllers.js.map
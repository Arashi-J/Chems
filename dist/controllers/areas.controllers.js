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
exports.createArea = exports.getAreas = void 0;
const area_1 = require("../models/area");
const getAreas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        ok: true
    });
});
exports.getAreas = getAreas;
const createArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const area = new area_1.AreaModel({ name });
    area.save();
    res.status(201).json({
        ok: true,
        area
    });
});
exports.createArea = createArea;
//# sourceMappingURL=areas.controllers.js.map
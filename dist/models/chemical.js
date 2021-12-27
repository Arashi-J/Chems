"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChemicalModel = void 0;
const mongoose_1 = require("mongoose");
const ChemicalSchema = new mongoose_1.Schema({
    chemical: {
        type: String,
        required: [true, "El nombre de la sustancia química es obligatorio"],
        unique: true
    },
    hazards: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Hazard',
        default: []
    },
    providers: {
        type: [String],
        default: []
    },
    manufacturers: {
        type: [String],
        default: []
    },
    pPhrases: {
        type: Array,
        default: []
    },
    hPhrases: {
        type: Array,
        default: []
    },
    ppe: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'PPE',
        default: []
    },
    fsms: {
        type: Boolean,
        default: false
    },
    ems: {
        type: Boolean,
        default: false
    },
    oshms: {
        type: Boolean,
        default: false
    }
});
exports.ChemicalModel = (0, mongoose_1.model)('Chemical', ChemicalSchema);
//# sourceMappingURL=chemical.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChemicalModel = void 0;
const mongoose_1 = require("mongoose");
const ChemicalSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "El nombre de la sustancia química es obligatorio"]
    },
    hazards: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Hazard'
    },
    pPhrases: {
        type: Array
    },
    hPhrases: {
        type: Array
    },
    ppe: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'PPE'
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
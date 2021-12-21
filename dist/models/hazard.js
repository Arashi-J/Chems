"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HazardModel = void 0;
const mongoose_1 = require("mongoose");
const HazardSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: [true, 'El código GHS es obligatorio'],
        unique: true
    },
    hazard: {
        type: String,
        required: [true, 'El nombre del peligro es obligatorio'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    precaution: {
        type: String,
        required: [true, 'Las recomendaciones de precaución son obligatorias']
    },
    pictogram: {
        type: String,
        required: [true, 'La imagen del pictograma es obligatoria']
    }
});
exports.HazardModel = (0, mongoose_1.model)('Hazard', HazardSchema);
//# sourceMappingURL=hazard.js.map
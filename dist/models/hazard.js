"use strict";
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
HazardSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, hazard = __rest(_a, ["__v"]);
    return hazard;
};
exports.HazardModel = (0, mongoose_1.model)('Hazard', HazardSchema);
//# sourceMappingURL=hazard.js.map
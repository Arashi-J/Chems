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
exports.ChemicalModel = void 0;
const mongoose_1 = require("mongoose");
const hazard_1 = require("./hazard");
const ppe_1 = require("./ppe");
const ChemicalSchema = new mongoose_1.Schema({
    chemical: {
        type: String,
        required: [true, "El nombre de la sustancia química es obligatorio"],
        unique: true,
        lowercase: true
    },
    hazards: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: hazard_1.HazardModel,
    },
    providers: {
        type: [String],
    },
    manufacturers: {
        type: [String],
    },
    pPhrases: [{
            code: { type: String },
            description: { type: String },
        }],
    hPhrases: [{
            code: { type: String },
            description: { type: String },
        }],
    ppes: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: ppe_1.PpeModel
    },
    sds: {
        status: {
            type: Boolean,
            default: false
        },
        language: {
            type: String,
            enum: ["español", "inglés", "otro", ""],
            default: ""
        },
        link: {
            type: String,
            default: ''
        }
    },
    fsms: {
        approval: {
            type: Boolean,
            default: false
        },
        approver: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        },
        approvalDate: {
            type: Date
        },
    },
    ems: {
        approval: {
            type: Boolean,
            default: false
        },
        approver: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        },
        approvalDate: {
            type: Date
        },
    },
    oshms: {
        approval: {
            type: Boolean,
            default: false
        },
        approver: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        },
        approvalDate: {
            type: Date
        },
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    lastUpdatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    lastUpdateDate: {
        type: Date,
        default: Date.now
    }
});
ChemicalSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, chemical = __rest(_a, ["__v"]);
    return chemical;
};
exports.ChemicalModel = (0, mongoose_1.model)('Chemical', ChemicalSchema);
//# sourceMappingURL=chemical.js.map
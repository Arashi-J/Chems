"use strict";
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
            code: String,
            description: String,
        }],
    hPhrases: [{
            code: String,
            description: String
        }],
    ppes: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: ppe_1.PpeModel,
        default: []
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
        }
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
        }
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
        }
    },
    status: {
        type: Boolean,
        default: true
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
exports.ChemicalModel = (0, mongoose_1.model)('Chemical', ChemicalSchema);
//# sourceMappingURL=chemical.js.map
import { Schema, model } from "mongoose";
import { Chemical } from "../interfaces/interfaces";
import { HazardModel } from "./hazard";
import { PpeModel } from "./ppe";

const ChemicalSchema = new Schema<Chemical>({
    chemical: {
        type: String,
        required: [true, "El nombre de la sustancia química es obligatorio"],
        unique: true,
        lowercase: true
    },
    hazards: {
        type: [Schema.Types.ObjectId],
        ref: HazardModel,
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
        type: [Schema.Types.ObjectId],
        ref: PpeModel,
        default: []
    },
    fsms: {
        approval: {
            type: Boolean,
            default: false
        },
        approver: {
            type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lastUpdateDate: {
        type: Date,
        default: Date.now
    }
});

export const ChemicalModel = model<Chemical>('Chemical', ChemicalSchema);
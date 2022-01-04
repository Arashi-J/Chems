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
        code: { type: String },
        description: { type: String },
    }],
    hPhrases: [{
        code: { type: String },
        description: { type: String },
    }],
    ppes: {
        type: [Schema.Types.ObjectId],
        ref: PpeModel
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
            type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lastUpdateDate: {
        type: Date,
        default: Date.now
    }

});

ChemicalSchema.methods.toJSON = function(){
    const {__v, ...chemical} = this.toObject();
    return chemical
}


export const ChemicalModel = model<Chemical>('Chemical', ChemicalSchema);
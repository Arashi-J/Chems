import { Schema, model } from "mongoose";
import { Chemical } from "../interfaces/interfaces";
import { HazardModel } from "./hazard";
import { PpeModel } from "./ppe";

const ChemicalSchema = new Schema<Chemical>({
    chemical: {
        type: String,
        required: [true, "El nombre de la sustancia química es obligatorio"],
        unique: true
    },
    hazards: {
        type: [Schema.Types.ObjectId],
        ref: HazardModel,
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
    ppes: {
        type: [Schema.Types.ObjectId],
        ref: PpeModel,
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

export const ChemicalModel = model<Chemical>('Chemical', ChemicalSchema);
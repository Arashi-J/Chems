import { Schema, model } from "mongoose";
import { Chemical } from "../interfaces/interfaces";

const ChemicalSchema = new Schema<Chemical>({
    chemical: {
        type: String,
        required: [true, "El nombre de la sustancia química es obligatorio"],
        unique: true
    },
    hazards: {
        type: [Schema.Types.ObjectId],
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
        type: [Schema.Types.ObjectId],
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

export const ChemicalModel = model<Chemical>('Chemical', ChemicalSchema);
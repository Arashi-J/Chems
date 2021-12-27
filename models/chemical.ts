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
        ref: 'Hazard'
    },
    providers: {
        type: [String]
    },
    manufacturers: {
        type: [String]
    },
    pPhrases: {
        type: Array
    },
    hPhrases: {
        type: Array
    },
    ppe: {
        type: [Schema.Types.ObjectId],
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

export const ChemicalModel = model<Chemical>('Chemical', ChemicalSchema);
import { Schema, model } from "mongoose";
import { Ppe } from "../interfaces/interfaces";

const PpeSchema = new Schema<Ppe>({
    ppe: {
        type: String,
        required: [true, 'El nombre del EPP es obligatorio'],
        unique: true
    },
    img: {
        type: String,
        default: ''
    }
});

export const PpeModel = model<Ppe>('Ppe', PpeSchema);
import { Schema, model } from "mongoose";
import { PPE } from "../interfaces/interfaces";

const ppeSchema = new Schema<PPE>({
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

export const ppeModel = model<PPE>('PPE', ppeSchema);
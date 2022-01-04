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

PpeSchema.methods.toJSON = function () {
    const { __v, ...ppe } = this.toObject();
    return ppe
}

export const PpeModel = model<Ppe>('Ppe', PpeSchema);
import { Schema, model } from 'mongoose';
import { Hazard } from '../interfaces/interfaces';

const HazardSchema = new Schema<Hazard>({
    code: {
        type: String,
        required: [true, 'El código GHS es obligatorio'],
        unique: true
    },
    hazard: {
        type: String,
        required: [true, 'El nombre del peligro es obligatorio'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    precaution: {
        type: String,
        required: [true, 'Las recomendaciones de precaución son obligatorias']
    },
    pictogram: {
        type: String,
        required: [true, 'La imagen del pictograma es obligatoria']
    }

});

HazardSchema.methods.toJSON = function () {
    const { __v, ...hazard } = this.toObject();
    return hazard
}


export const HazardModel = model<Hazard>('Hazard', HazardSchema);
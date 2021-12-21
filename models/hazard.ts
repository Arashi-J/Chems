import {Schema, model} from 'mongoose';
import { Hazard } from '../interfaces/interfaces';

const HazardSchema = new Schema<Hazard>({
    hazard: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    precaution: {
        type: String,
        required: true,
        unique: true
    }


});



export const HazardModel = model<Hazard>('Hazard', HazardSchema);
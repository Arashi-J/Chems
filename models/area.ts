import {Schema, model} from 'mongoose';
import { Area } from '../interfaces/interfaces';

const AreaSchema = new Schema<Area>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    }

});



export const AreaModel = model<Area>('Area', AreaSchema);
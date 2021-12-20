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
    },
    chemicals:{
        type: [Schema.Types.ObjectId],
    }

});



export const AreaModel = model<Area>('Area', AreaSchema);
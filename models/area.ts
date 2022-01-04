import { Schema, model } from 'mongoose';
import { Area } from '../interfaces/interfaces';

const AreaSchema = new Schema<Area>({
    area: {
        type: String,
        required: [true, 'El nombre del área es obligatorio'],
        unique: true,
        lowercase: true
    },
    status: {
        type: Boolean,
        default: true
    },
    chemicals: {
        type: [Schema.Types.ObjectId],
        ref: 'Chemical'
    },
    leader: {
        type: String,
        default: ''
    },
    lastUpdatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lastUpdateDate: {
        type: Date,
        default: Date.now
    }
});

AreaSchema.methods.toJSON = function () {
    const { __v, ...area } = this.toObject();
    return area
}


export const AreaModel = model<Area>('Area', AreaSchema);
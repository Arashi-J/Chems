import {Schema, model} from 'mongoose';
import { Role } from '../interfaces/interfaces';

const RoleSchema = new Schema<Role>({
    role: {
        type: String,
        required: [true, 'El nombre del rol es obligatorio'],
        unique: true
    }

});



export const RoleModel = model<Role>('Role', RoleSchema);
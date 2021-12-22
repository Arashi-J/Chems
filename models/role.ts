import {Schema, model} from 'mongoose';
import { Role } from '../interfaces/interfaces';

const RoleSchema = new Schema<Role>({
    role: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        unique: true
    },
    role_name: {
        type: String,
        required: [true, 'El nombre del rol es obligatorio'],
    }

});



export const RoleModel = model<Role>('Role', RoleSchema);
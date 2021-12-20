import {Schema, model} from 'mongoose';
import { Role } from '../interfaces/interfaces';

const RoleSchema = new Schema<Role>({
    name: {
        type: String,
        required: true,
        unique: true
    }

});



export const RoleModel = model<Role>('Role', RoleSchema);
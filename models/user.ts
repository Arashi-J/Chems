import { Schema, model } from "mongoose";
import { User } from "../interfaces/interfaces";

const UserSchema = new Schema<User>({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    email: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    },
    role: {
        type: String,
        required: [true, "El rol del usuario es obligatorio"]
    },
    areas: {
        type: [Schema.Types.ObjectId],
    },
    status: {
        type: Boolean,
        default: true
    }
});

export const UserModel = model<User>('User', UserSchema);
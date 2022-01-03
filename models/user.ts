import { Schema, model } from "mongoose";
import { User } from "../interfaces/interfaces";

const UserSchema = new Schema<User>({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    email: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true,
        lowercase: true
    },
    role: {
        type: String,
        required: [true, "El rol del usuario es obligatorio"]
    },
    areas: {
        type: [Schema.Types.ObjectId],
        ref: 'Area',
        default: []
    },
    status: {
        type: Boolean,
        default: true
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

UserSchema.methods.toJSON = function(){
    const {__v, password, ...user} = this.toObject();
    return user
}


export const UserModel = model<User>('User', UserSchema);
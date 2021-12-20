import { Schema, model } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    }
});

export const UserModel = model<User>('User', UserSchema);
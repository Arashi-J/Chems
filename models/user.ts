import { Schema, model } from "mongoose";
import { User } from "../interfaces/interfaces";

const UserSchema = new Schema<User>({
    name: {
        type: String,
        required: [true, 'The name is mandatory'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "The password is mandatory"]
    },
    email: {
        type: String,
        required: [true, "The email is mandatory"],
        unique: true
    },
    role: {
        type: String,
        required: [true, "The role is mandatory"]
    },
    areas: {
        type: Array,
    },
    status: {
        type: Boolean,
        default: true
    }
});

export const UserModel = model<User>('User', UserSchema);
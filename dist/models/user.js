"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=user.js.map
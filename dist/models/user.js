"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    }
});
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=user.js.map
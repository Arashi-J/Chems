"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Area',
        default: []
    },
    status: {
        type: Boolean,
        default: true
    },
    lastUpdatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    lastUpdateDate: {
        type: Date,
        default: Date.now
    }
});
UserSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, password } = _a, user = __rest(_a, ["__v", "password"]);
    return user;
};
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=user.js.map
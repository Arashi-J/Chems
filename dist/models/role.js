"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
const mongoose_1 = require("mongoose");
const RoleSchema = new mongoose_1.Schema({
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
exports.RoleModel = (0, mongoose_1.model)('Role', RoleSchema);
//# sourceMappingURL=role.js.map
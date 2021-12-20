"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
const mongoose_1 = require("mongoose");
const RoleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});
exports.RoleModel = (0, mongoose_1.model)('Role', RoleSchema);
//# sourceMappingURL=role.js.map
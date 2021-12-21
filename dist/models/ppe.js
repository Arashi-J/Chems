"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ppeModel = void 0;
const mongoose_1 = require("mongoose");
const ppeSchema = new mongoose_1.Schema({
    ppe: {
        type: String,
        required: [true, 'El nombre del EPP es obligatorio'],
        unique: true
    },
    img: {
        type: String,
        default: ''
    }
});
exports.ppeModel = (0, mongoose_1.model)('PPE', ppeSchema);
//# sourceMappingURL=ppe.js.map
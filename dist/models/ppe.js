"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PpeModel = void 0;
const mongoose_1 = require("mongoose");
const PpeSchema = new mongoose_1.Schema({
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
exports.PpeModel = (0, mongoose_1.model)('Ppe', PpeSchema);
//# sourceMappingURL=ppe.js.map
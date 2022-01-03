"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaModel = void 0;
const mongoose_1 = require("mongoose");
const AreaSchema = new mongoose_1.Schema({
    area: {
        type: String,
        required: [true, 'El nombre del área es obligatorio'],
        unique: true,
        lowercase: true
    },
    status: {
        type: Boolean,
        default: true
    },
    chemicals: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Chemical'
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
exports.AreaModel = (0, mongoose_1.model)('Area', AreaSchema);
//# sourceMappingURL=area.js.map
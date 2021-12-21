"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HazardModel = void 0;
const mongoose_1 = require("mongoose");
const HazardSchema = new mongoose_1.Schema({
    hazard: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    precaution: {
        type: String,
        required: true,
        unique: true
    }
});
exports.HazardModel = (0, mongoose_1.model)('Hazard', HazardSchema);
//# sourceMappingURL=hazard.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaModel = void 0;
const mongoose_1 = require("mongoose");
const AreaSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    chemicals: {
        type: [mongoose_1.Schema.Types.ObjectId],
    }
});
exports.AreaModel = (0, mongoose_1.model)('Area', AreaSchema);
//# sourceMappingURL=area.js.map
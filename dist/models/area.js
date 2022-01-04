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
    leader: {
        type: String,
        default: ''
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
AreaSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, area = __rest(_a, ["__v"]);
    return area;
};
exports.AreaModel = (0, mongoose_1.model)('Area', AreaSchema);
//# sourceMappingURL=area.js.map
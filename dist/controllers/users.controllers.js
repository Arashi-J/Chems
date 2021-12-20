"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
const user_1 = require("../models/user");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        ok: true
    });
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, email, role, areas } = req.body;
    const user = new user_1.UserModel({ name, password, email, role, areas });
    user.save();
    res.status(201).json({
        ok: true,
        user
    });
});
exports.createUser = createUser;
//# sourceMappingURL=users.controllers.js.map
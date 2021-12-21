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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//List Users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { resultsLimit = 10, searchFrom = 0, userStatus = 'all' } = req.query;
    let query = userStatus === 'active' ? { status: true } :
        userStatus === 'inactive' ? { status: false } : {};
    const users = yield user_1.UserModel.find(query)
        .skip(Number(searchFrom))
        .limit(Number(resultsLimit));
    const totalUsers = yield user_1.UserModel.countDocuments(query);
    return res.status(200).json({
        users,
        totalUsers
    });
});
exports.getUsers = getUsers;
//Look for user by id
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.UserModel.findById(id);
    if (user) {
        return res.status(200).json({
            user
        });
    }
    return res.status(404).json({
        msg: 'Usuario no encontrado'
    });
});
exports.getUser = getUser;
//Create user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, email, role, areas } = req.body;
    const user = new user_1.UserModel({ name, password, email, role, areas });
    //Password Hash
    const salt = bcryptjs_1.default.genSaltSync();
    user.password = bcryptjs_1.default.hashSync(password, salt);
    yield user.save();
    return res.status(201).json({
        user
    });
});
exports.createUser = createUser;
//Update User
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    return res.status(200).json({
        ok: true,
        id
    });
});
exports.updateUser = updateUser;
//# sourceMappingURL=users.controllers.js.map
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const text_normalizers_1 = require("../helpers/text-normalizers");
//List Users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { resultsLimit = 10, searchFrom = 0, userStatus = 'all' } = req.query;
    const query = userStatus === 'active' ? { status: true } :
        userStatus === 'inactive' ? { status: false } : {};
    const users = yield user_1.UserModel.find(query)
        .skip(Number(searchFrom))
        .limit(Number(resultsLimit))
        .populate('areas', 'area')
        .populate('lastUpdatedBy', 'name');
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
    const user = yield user_1.UserModel.findById(id)
        .populate('areas', 'area')
        .populate('lastUpdatedBy', 'name');
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
    const user = new user_1.UserModel({
        name: (0, text_normalizers_1.titleCase)(name.trim()),
        password,
        email: email.trim().toLowerCase(),
        role: role.trim().toLowerCase(),
        areas,
        lastUpdatedBy: req.user._id
    });
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
    const _a = req.body, { _id, password, __v } = _a, newUserData = __rest(_a, ["_id", "password", "__v"]);
    if (!password && Object.keys(newUserData).length === 0) {
        return res.status(400).json({
            msg: 'No se recibieron datos para actualizar'
        });
    }
    newUserData.lastUpdatedBy = req.user._id;
    newUserData.lastUpdateDate = Date.now();
    if (password) {
        const salt = bcryptjs_1.default.genSaltSync();
        newUserData.password = bcryptjs_1.default.hashSync(password, salt);
    }
    if (newUserData.name) {
        newUserData.name = (0, text_normalizers_1.titleCase)(newUserData.name.trim());
    }
    const user = yield user_1.UserModel.findByIdAndUpdate(id, newUserData, { new: true })
        .populate('areas', 'area')
        .populate('lastUpdatedBy', 'name');
    return res.status(202).json({
        user
    });
});
exports.updateUser = updateUser;
//# sourceMappingURL=users.controllers.js.map
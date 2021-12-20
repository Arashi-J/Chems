"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const server_1 = __importDefault(require("./models/server"));
//dotenv config
(0, dotenv_1.config)();
//server init
const server = new server_1.default();
server.listen();
//# sourceMappingURL=index.js.map
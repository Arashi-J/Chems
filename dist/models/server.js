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
exports.Server = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_db_1 = require("../database/config.db");
const areas_routes_1 = __importDefault(require("../routes/areas.routes"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const chemicals_routes_1 = __importDefault(require("../routes/chemicals.routes"));
const hazards_routes_1 = __importDefault(require("../routes/hazards.routes"));
const ppes_routes_1 = __importDefault(require("../routes/ppes.routes"));
const search_routes_1 = __importDefault(require("../routes/search.routes"));
const users_routes_1 = __importDefault(require("../routes/users.routes"));
class Server {
    constructor() {
        this.apiPaths = {
            areas: '/api/areas',
            auth: '/api/auth',
            chemicals: '/api/chemicals',
            hazards: '/api/hazards',
            ppes: '/api/ppes',
            search: '/api/search',
            users: '/api/users',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8090';
        //Initial methods
        this.dbConnect();
        this.middlewares();
        this.routes();
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_db_1.dbConnection)();
        });
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //Body parsing
        this.app.use(express_1.default.json());
        //Public dirs
        this.app.use(express_1.default.static('public'));
        this.app.use('/assets', express_1.default.static('assets'));
    }
    routes() {
        this.app.use(this.apiPaths.areas, areas_routes_1.default);
        this.app.use(this.apiPaths.auth, auth_routes_1.default);
        this.app.use(this.apiPaths.chemicals, chemicals_routes_1.default);
        this.app.use(this.apiPaths.hazards, hazards_routes_1.default);
        this.app.use(this.apiPaths.ppes, ppes_routes_1.default);
        this.app.use(this.apiPaths.search, search_routes_1.default);
        this.app.use(this.apiPaths.users, users_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port);
        });
    }
}
exports.Server = Server;
exports.default = Server;
//# sourceMappingURL=server.js.map
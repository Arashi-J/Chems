"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const middlewares_1 = require("../middlewares/middlewares");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.body)('email', 'Ingrese un correo válido').isEmail(),
    (0, express_validator_1.body)('password', 'Ingrese una contraseña').notEmpty(),
    middlewares_1.requestValidator
], auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map
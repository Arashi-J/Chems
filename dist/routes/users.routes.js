"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_controllers_1 = require("../controllers/users.controllers");
const db_validators_1 = require("../helpers/db-validators");
const middlewares_1 = require("../middlewares/middlewares");
const router = (0, express_1.Router)();
//List Users
router.get('/', users_controllers_1.getUsers);
//Look for user by id
router.get('/:id', [
    (0, express_validator_1.check)('id', 'El parámetro de búsqueda no es un id de MongoDB válido').isMongoId(),
    middlewares_1.requestValidator
], users_controllers_1.getUser);
//Create user
router.post('/', [
    (0, express_validator_1.check)('name', 'El nombre no puede estar vacío').notEmpty(),
    (0, express_validator_1.check)('password', 'El password debe contener mínimo 6 carácteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'El correo no es válido').isEmail(),
    (0, express_validator_1.check)('email').custom(db_validators_1.existingEmail),
    (0, express_validator_1.check)('role').custom(db_validators_1.validRole),
    middlewares_1.requestValidator
], users_controllers_1.createUser);
//Update User
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El parámetro de búsqueda no es un id de MongoDB válido').isMongoId(),
    middlewares_1.requestValidator
], users_controllers_1.updateUser);
exports.default = router;
//# sourceMappingURL=users.routes.js.map
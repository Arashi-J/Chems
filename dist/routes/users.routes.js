"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const jwt_validator_1 = require("../middlewares/jwt-validator");
const middlewares_1 = require("../middlewares/middlewares");
const db_validators_1 = require("../helpers/db-validators");
const users_controllers_1 = require("../controllers/users.controllers");
const router = (0, express_1.Router)();
//List Users
router.get('/', users_controllers_1.getUsers);
//Look for user by id
router.get('/:id', [
    (0, express_validator_1.check)('id', 'El parámetro de búsqueda no es un id de MongoDB válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existingUserId),
    middlewares_1.requestValidator
], users_controllers_1.getUser);
//Create user
router.post('/', [
    jwt_validator_1.jwtValidator,
    (0, middlewares_1.roleValidator)('admin'),
    (0, express_validator_1.check)('name', 'El nombre no puede estar vacío').notEmpty(),
    (0, express_validator_1.check)('password', 'El password debe contener mínimo 6 carácteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'El correo no es válido').isEmail(),
    (0, express_validator_1.check)('email').custom(db_validators_1.existingEmail),
    (0, express_validator_1.check)('role').custom(db_validators_1.validRole),
    (0, express_validator_1.check)('status', "el estado debe ser un booleano").isBoolean().optional({ nullable: true }),
    (0, express_validator_1.check)('areas', 'No se recibió un array de áreas').isArray().optional({ nullable: true }),
    (0, express_validator_1.check)('areas').custom(db_validators_1.validAreas).optional({ nullable: true }),
    middlewares_1.requestValidator
], users_controllers_1.createUser);
//Update User
router.put('/:id', [
    jwt_validator_1.jwtValidator,
    (0, middlewares_1.roleValidator)('admin'),
    (0, express_validator_1.check)('id', 'El parámetro de búsqueda no es un id de MongoDB válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existingUserId),
    (0, express_validator_1.check)('name', 'El nombre no puede estar vacío').notEmpty().optional({ nullable: true }),
    (0, express_validator_1.check)('email', 'El correo no es válido').isEmail().optional({ nullable: true }),
    (0, express_validator_1.check)('email').custom(db_validators_1.existingEmail).optional({ nullable: true }),
    (0, express_validator_1.check)('password', 'El password debe contener mínimo 6 carácteres').isLength({ min: 6 }).optional({ nullable: true }),
    (0, express_validator_1.check)('role').custom(db_validators_1.validRole).optional({ nullable: true }),
    (0, express_validator_1.check)('status', "el estado debe ser un booleano").isBoolean().optional({ nullable: true }),
    (0, express_validator_1.check)('areas', 'No se recibió un array de áreas').isArray().optional({ nullable: true }),
    (0, express_validator_1.check)('areas', 'Uno o más valores inválidos').custom(db_validators_1.validAreas).optional({ nullable: true }),
    middlewares_1.requestValidator
], users_controllers_1.updateUser);
exports.default = router;
//# sourceMappingURL=users.routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const jwt_validator_1 = require("../middlewares/jwt-validator");
const middlewares_1 = require("../middlewares/middlewares");
const db_validators_1 = require("../helpers/db-validators");
const chemicals_controller_1 = require("../controllers/chemicals.controller");
const router = (0, express_1.Router)();
router.get('/', chemicals_controller_1.getChemicals);
router.get('/:id', [
    (0, express_validator_1.param)('id', 'El ´parámetro de búsqueda no es un MongoDB id válido.').isMongoId(),
    (0, express_validator_1.param)('id').custom(db_validators_1.existingChemicalId),
    middlewares_1.requestValidator
], chemicals_controller_1.getChemical);
router.post('/', [
    jwt_validator_1.jwtValidator,
    (0, express_validator_1.body)('chemical', 'Se debe ingresar el nombre del químico').notEmpty(),
    (0, express_validator_1.body)('chemical').custom(db_validators_1.existingChemical),
    (0, express_validator_1.body)([
        'hazards',
        'pPhrases',
        'hPhrases',
        'ppes',
        'providers',
        'manufacturers'
    ], 'debe ser un array de valores válidos')
        .isArray().optional({ nullable: true }),
    (0, express_validator_1.body)([
        'hPhrases.*.code',
        'hPhrases.*.description',
        'pPhrases.*.code',
        'pPhrases.*.description',
    ], 'No se recibieron valor tipo string para code y/o description de las phrases').exists(),
    (0, express_validator_1.body)([
        'providers[*]',
        'manufacturers[*]',
        'hPhrases.*.code',
        'hPhrases.*.description',
        'pPhrases.*.code',
        'pPhrases.*.description',
        'sds.language',
        'sds.link',
    ], 'Debe ser tipo string')
        .isString().optional({ nullable: true }),
    (0, express_validator_1.body)('hazards').custom(db_validators_1.validHazards).optional({ nullable: true }),
    (0, express_validator_1.body)('ppes').custom(db_validators_1.validPpes).optional({ nullable: true }),
    (0, express_validator_1.body)('sds.language', 'sds.language debe contener los siguientes valores: ["español", "inglés", "otro", ""]')
        .toLowerCase().isIn(['español', "inglés", 'otro', '']).optional({ nullable: true }),
    (0, express_validator_1.body)(['status', "sds.status"], 'El campo status y sds.status deben ser tipo boolean')
        .isBoolean().optional({ nullable: true }),
    middlewares_1.requestValidator
], chemicals_controller_1.createChemical);
router.put('/:id', [
    jwt_validator_1.jwtValidator,
    (0, express_validator_1.param)('id', 'El ´parámetro de búsqueda no es un MongoDB id válido.').isMongoId(),
    (0, express_validator_1.param)('id').custom(db_validators_1.existingChemicalId),
    (0, express_validator_1.body)('chemical').custom(db_validators_1.existingChemical),
    (0, express_validator_1.body)([
        'hazards',
        'pPhrases',
        'hPhrases',
        'ppes',
        'providers',
        'manufacturers'
    ], 'debe ser un array de valores válidos')
        .isArray().optional({ nullable: true }),
    (0, express_validator_1.body)([
        'hPhrases.*.code',
        'hPhrases.*.description',
        'pPhrases.*.code',
        'pPhrases.*.description',
    ], 'No se recibieron valor tipo string para code y/o description de las phrases').exists(),
    (0, express_validator_1.body)([
        'providers[*]',
        'manufacturers[*]',
        'hPhrases.*.code',
        'hPhrases.*.description',
        'pPhrases.*.code',
        'pPhrases.*.description',
        'sds.language',
        'sds.link',
    ], 'Debe ser tipo string')
        .isString().optional({ nullable: true }),
    (0, express_validator_1.body)('hazards').custom(db_validators_1.validHazards).optional({ nullable: true }),
    (0, express_validator_1.body)('ppes').custom(db_validators_1.validPpes).optional({ nullable: true }),
    (0, express_validator_1.body)('sds.language', 'sds.language debe contener los siguientes valores: ["español", "inglés", "otro", ""]')
        .toLowerCase().isIn(['español', "inglés", 'otro', '']).optional({ nullable: true }),
    (0, express_validator_1.body)(['status', "sds.status"], 'El campo status y sds.status deben ser tipo boolean')
        .isBoolean().optional({ nullable: true }),
    middlewares_1.requestValidator
], chemicals_controller_1.updateChemical);
router.patch('/:id', [
    jwt_validator_1.jwtValidator,
    (0, express_validator_1.param)('id', 'El parámetro de búsqueda no es un MongoDB id válido.').isMongoId(),
    (0, express_validator_1.param)('id').custom(db_validators_1.existingChemicalId),
    middlewares_1.chemApprovalValidation,
    middlewares_1.requestValidator
], chemicals_controller_1.approveChemical);
exports.default = router;
//# sourceMappingURL=chemicals.routes.js.map
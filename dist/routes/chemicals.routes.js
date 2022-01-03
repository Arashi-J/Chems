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
    (0, express_validator_1.check)('id', 'El ´parámetro de búsqueda no es un MongoDB id válido.').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existingChemicalId),
    middlewares_1.requestValidator
], chemicals_controller_1.getChemical);
router.post('/', [
    jwt_validator_1.jwtValidator,
    (0, express_validator_1.check)('chemical', 'Se debe ingresar el nombre del químoco').notEmpty(),
    (0, express_validator_1.check)('chemical').custom(db_validators_1.existingChemical),
    (0, express_validator_1.check)('hazards').custom(db_validators_1.validHazards),
    (0, express_validator_1.check)('ppes').custom(db_validators_1.validPpes),
    (0, express_validator_1.check)(['pPhrases', 'hPhrases'], 'No se recibió un Array de Phrases').isArray().optional({ nullable: true }),
    (0, express_validator_1.check)([
        'hPhrases.*.code',
        'pPhrases.*.code',
        'hPhrases.*.description',
        'pPhrases.*.description',
    ], 'Las frases P y H deben ser un arreglo de objetos tipo Phrase: [{code: string, description: string}]').isString(),
    (0, express_validator_1.check)(['providers', 'manufacturers'], 'El valor ingresado debe ser un Array de tipos String').isArray().optional({ nullable: true }),
    (0, express_validator_1.check)(['providers[*]', 'manufacturers[*]'], 'Los items del array deben ser tipo string').isString().optional({ nullable: true }),
    middlewares_1.requestValidator
], chemicals_controller_1.createChemical);
router.put('/:id', [
    jwt_validator_1.jwtValidator,
    (0, express_validator_1.check)('id', 'El ´parámetro de búsqueda no es un MongoDB id válido.').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existingChemicalId),
    (0, express_validator_1.check)('chemical').custom(db_validators_1.existingChemical).optional({ nullable: true }),
    (0, express_validator_1.check)('hazards').custom(db_validators_1.validHazards).optional({ nullable: true }),
    (0, express_validator_1.check)('ppes').custom(db_validators_1.validPpes).optional({ nullable: true }),
    (0, express_validator_1.check)(['pPhrases', 'hPhrases'], 'No se recibió un Array de Phrases').isArray().optional({ nullable: true }),
    (0, express_validator_1.check)([
        'hPhrases.*.code',
        'pPhrases.*.code',
        'hPhrases.*.description',
        'pPhrases.*.description',
    ], 'Las frases P y H deben ser un arreglo de objetos tipo Phrase: [{code: string, description: string}]').isString(),
    (0, express_validator_1.check)(['providers', 'manufacturers'], 'Los items del array deben ser tipo string').isArray().optional({ nullable: true }),
    (0, express_validator_1.check)(['providers[*]', 'manufacturers[*]'], 'Los items del array deben ser tipo string').isString().optional({ nullable: true }),
    (0, express_validator_1.check)('status', 'El campo status deben ser tipo Boolean').isBoolean().optional({ nullable: true }),
    middlewares_1.requestValidator
], chemicals_controller_1.updateChemical);
router.patch('/:id', [
    jwt_validator_1.jwtValidator,
    (0, express_validator_1.check)('id', 'El parámetro de búsqueda no es un MongoDB id válido.').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existingChemicalId),
    middlewares_1.requestValidator
], chemicals_controller_1.approveChemical);
exports.default = router;
//# sourceMappingURL=chemicals.routes.js.map
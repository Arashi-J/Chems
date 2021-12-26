"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares/middlewares");
const db_validators_1 = require("../helpers/db-validators");
const areas_controllers_1 = require("../controllers/areas.controllers");
const router = (0, express_1.Router)();
//List area
router.get('/', areas_controllers_1.getAreas);
//Look for area by id
router.get('/:id', [
    (0, express_validator_1.check)('id', 'El parámetro de búsqueda no es un MongoID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existingAreaId),
    middlewares_1.requestValidator
], areas_controllers_1.getArea);
//Create area
router.post('/', [
    (0, express_validator_1.check)('area', 'El nombre del área no puede estar vacío').notEmpty(),
    (0, express_validator_1.check)('area').custom(db_validators_1.existingArea),
    (0, express_validator_1.check)('status', "el estado debe ser un booleano").isBoolean().optional({ nullable: true }),
    (0, express_validator_1.check)('chemicals').custom(db_validators_1.validChemicals),
    middlewares_1.requestValidator
], areas_controllers_1.createArea);
//Update area
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El parámetro de búsqueda no es un MongoID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existingAreaId).optional({ nullable: true }),
    (0, express_validator_1.check)('area').custom(db_validators_1.existingArea).optional({ nullable: true }),
    (0, express_validator_1.check)('chemicals').custom(db_validators_1.validChemicals).optional({ nullable: true }),
    middlewares_1.requestValidator
], areas_controllers_1.updateArea);
exports.default = router;
//# sourceMappingURL=areas.routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const chemicals_controller_1 = require("../controllers/chemicals.controller");
const db_validators_1 = require("../helpers/db-validators");
const middlewares_1 = require("../middlewares/middlewares");
const router = (0, express_1.Router)();
router.get('/', chemicals_controller_1.getChemicals);
router.get('/:id', [
    (0, express_validator_1.check)('id', 'El ´parámetro de búsqueda no es un MongoDB id válido.').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existingChemicalId),
    middlewares_1.requestValidator
], chemicals_controller_1.getChemical);
router.post('/', [
    (0, express_validator_1.check)('chemical').custom(db_validators_1.existingChemical),
    middlewares_1.requestValidator
], chemicals_controller_1.createChemical);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El ´parámetro de búsqueda no es un MongoDB id válido.').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existingChemicalId),
    (0, express_validator_1.check)('id').custom(db_validators_1.existingChemical).optional({ nullable: true }),
    middlewares_1.requestValidator
], chemicals_controller_1.updateChemical);
exports.default = router;
//# sourceMappingURL=chemicals.routes.js.map
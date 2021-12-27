"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const chemicals_controller_1 = require("../controllers/chemicals.controller");
const middlewares_1 = require("../middlewares/middlewares");
const router = (0, express_1.Router)();
router.get('/', chemicals_controller_1.getChemicals);
router.get('/:id', [
    (0, express_validator_1.check)('id', 'El ´parámetro de búsqueda no es un MongoDB id válido').isMongoId(),
    middlewares_1.requestValidator
], chemicals_controller_1.getChemical);
router.post('/', [
    middlewares_1.requestValidator
], chemicals_controller_1.createChemical);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El ´parámetro de búsqueda no es un MongoDB id válido').isMongoId(),
    middlewares_1.requestValidator
], chemicals_controller_1.updateChemical);
exports.default = router;
//# sourceMappingURL=chemicals.routes.js.map
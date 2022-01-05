"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ppes_controllers_1 = require("../controllers/ppes.controllers");
const middlewares_1 = require("../middlewares/middlewares");
const router = (0, express_1.Router)();
router.get('/', ppes_controllers_1.getPpes);
router.get('/:id', [
    (0, express_validator_1.param)('id', 'El parámetro de búsqueda no es un MongoID válido').isMongoId(),
    middlewares_1.requestValidator
], ppes_controllers_1.getPpe);
router.get('/:id/pictogram', [
    (0, express_validator_1.param)('id', 'El parámetro de búsqueda no es un MongoID válido').isMongoId(),
    middlewares_1.requestValidator
], ppes_controllers_1.showPpeIcon);
exports.default = router;
//# sourceMappingURL=ppes.routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const hazards_controllers_1 = require("../controllers/hazards.controllers");
const middlewares_1 = require("../middlewares/middlewares");
const router = (0, express_1.Router)();
router.get('/', hazards_controllers_1.getHazards);
router.get('/:id', [
    (0, express_validator_1.param)('id', 'El parámetro de búsqueda no es un MongoID válido').isMongoId(),
    middlewares_1.requestValidator
], hazards_controllers_1.getHazard);
router.get('/:id/pictogram', [
    (0, express_validator_1.param)('id', 'El parámetro de búsqueda no es un MongoID válido').isMongoId(),
    middlewares_1.requestValidator
], hazards_controllers_1.showHazardPictogram);
exports.default = router;
//# sourceMappingURL=hazards.routes.js.map
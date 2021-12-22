"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares/middlewares");
const db_validators_1 = require("../helpers/db-validators");
const areas_controllers_1 = require("../controllers/areas.controllers");
const router = (0, express_1.Router)();
//List Areas
router.get('/', areas_controllers_1.getAreas);
//Create Area
router.post('/', [
    (0, express_validator_1.check)('area', 'El nombre del área no puede estar vacío').notEmpty(),
    (0, express_validator_1.check)('area').custom(db_validators_1.existingArea),
    middlewares_1.requestValidator
], areas_controllers_1.createArea);
exports.default = router;
//# sourceMappingURL=areas.routes.js.map
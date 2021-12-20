"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const areas_controllers_1 = require("../controllers/areas.controllers");
const router = (0, express_1.Router)();
//User listing
router.get('/', areas_controllers_1.getAreas);
//User creation
router.post('/', areas_controllers_1.createArea);
exports.default = router;
//# sourceMappingURL=areas.routes.js.map
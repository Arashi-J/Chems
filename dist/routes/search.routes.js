"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_controllers_1 = require("../controllers/search.controllers");
const router = (0, express_1.Router)();
router.get('/:collection/:term', search_controllers_1.search);
exports.default = router;
//# sourceMappingURL=search.routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const router = (0, express_1.Router)();
//User listing
router.get('/', users_controllers_1.getUsers);
//User creation
router.post('/', users_controllers_1.createUser);
exports.default = router;
//# sourceMappingURL=users.routes.js.map
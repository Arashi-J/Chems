import { check } from 'express-validator';
import { Router } from 'express';

import { login } from '../controllers/auth.controller';
import { requestValidator } from '../middlewares/middlewares';

const router = Router();

router.post('/login', [
    check('email', 'Ingrese un correo válido').isEmail(),
    check('password', 'Ingrese una contraseña').notEmpty(),
    requestValidator
], login);

export default router;
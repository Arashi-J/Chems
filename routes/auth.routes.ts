import { body } from 'express-validator';
import { Router } from 'express';

import { login } from '../controllers/auth.controller';
import { requestValidator } from '../middlewares/middlewares';

const router = Router();

router.post('/login', [
    body('email', 'Ingrese un correo válido').isEmail(),
    body('password', 'Ingrese una contraseña').notEmpty(),
    requestValidator
], login);

export default router;
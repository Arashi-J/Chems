import { Router } from 'express';
import { body, param } from 'express-validator';

import { jwtValidator } from '../middlewares/jwt-validator';
import { requestValidator, roleValidator } from '../middlewares/middlewares';

import { existingUserId, existingEmail, validAreas, validRole } from '../helpers/db-validators';

import { createUser, getUsers, getUser, updateUser } from '../controllers/users.controllers';

const router = Router();

//List Users
router.get('/', getUsers);

//Look for user by id
router.get('/:id', [
    param('id', 'El parámetro de búsqueda no es un id de MongoDB válido').isMongoId(),
    param('id').custom(existingUserId),
    requestValidator
], getUser)

//Create user
router.post('/', [
    jwtValidator,
    roleValidator('admin'),
    body('name', 'El nombre no puede estar vacío').notEmpty(),
    body('password', 'El password debe contener mínimo 6 carácteres').isLength({ min: 6 }),
    body('email', 'El correo no es válido').isEmail(),
    body('email').custom(existingEmail),
    body('role').custom(validRole),
    body('areas', 'No se recibió un array de áreas').isArray().optional({ nullable: true }),
    body('areas').custom(validAreas).optional({ nullable: true }),
    requestValidator
], createUser);

//Update User
router.put('/:id', [
    jwtValidator,
    roleValidator('admin'),
    param('id', 'El parámetro de búsqueda no es un id de MongoDB válido').isMongoId(),
    param('id').custom(existingUserId),
    body('name', 'El nombre no puede estar vacío').notEmpty().optional({ nullable: true }),
    body('email', 'El correo no es válido').isEmail().optional({ nullable: true }),
    body('email').custom(existingEmail).optional({ nullable: true }),
    body('password', 'El password debe contener mínimo 6 carácteres').isLength({ min: 6 }).optional({ nullable: true }),
    body('role').custom(validRole).optional({ nullable: true }),
    body('status', "el estado debe ser un booleano").isBoolean().optional({ nullable: true }),
    body('areas', 'No se recibió un array de áreas').isArray().optional({ nullable: true }),
    body('areas', 'Uno o más valores inválidos').custom(validAreas).optional({ nullable: true }),
    requestValidator
], updateUser);



export default router;

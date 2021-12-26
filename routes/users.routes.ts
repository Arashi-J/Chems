import { Router } from 'express';
import { check } from 'express-validator';

import { requestValidator } from '../middlewares/middlewares';
import { existingUserId, existingEmail, validAreas, validRole } from '../helpers/db-validators';

import { createUser, getUsers, getUser, updateUser } from '../controllers/users.controllers';

const router = Router();

//List Users
router.get('/', getUsers);

//Look for user by id
router.get('/:id', [
    check('id', 'El parámetro de búsqueda no es un id de MongoDB válido').isMongoId(),
    check('id').custom(existingUserId),
    requestValidator
], getUser)

//Create user
router.post('/', [
    check('name', 'El nombre no puede estar vacío').notEmpty(),
    check('password', 'El password debe contener mínimo 6 carácteres').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(existingEmail),
    check('role').custom(validRole),
    check('status', "el estado debe ser un booleano").isBoolean().optional({ nullable: true }),
    check('areas').custom(validAreas).optional({ nullable: true }),
    requestValidator
], createUser);

//Update User
router.put('/:id', [
    check('id', 'El parámetro de búsqueda no es un id de MongoDB válido').isMongoId(),
    check('id').custom(existingUserId),
    check('name', 'El nombre no puede estar vacío').notEmpty().optional({ nullable: true }),
    check('email', 'El correo no es válido').isEmail().optional({ nullable: true }),
    check('email').custom(existingEmail),
    check('password', 'El password debe contener mínimo 6 carácteres').isLength({ min: 6 }).optional({ nullable: true }),
    check('role').custom(validRole).optional({ nullable: true }),
    check('status', "el estado debe ser un booleano").isBoolean().optional({ nullable: true }),
    check('areas', 'Uno o más valores inválidos').custom(validAreas).optional({ nullable: true }),
    requestValidator
], updateUser);



export default router;

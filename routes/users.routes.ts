import {Router} from 'express';
import {check} from 'express-validator';

import { createUser, getUsers, getUser, updateUser } from '../controllers/users.controllers';
import { existingEmail, validArea, validRole } from '../helpers/db-validators';
import { requestValidator } from '../middlewares/middlewares';

const router = Router();

//List Users
router.get('/', getUsers);

//Look for user by id
router.get('/:id',[
    check('id', 'El parámetro de búsqueda no es un id de MongoDB válido').isMongoId(),
    requestValidator
] , getUser)

//Create user
router.post('/',[
    check('name', 'El nombre no puede estar vacío').notEmpty(),
    check('password', 'El password debe contener mínimo 6 carácteres').isLength({min: 6}),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(existingEmail),
    check('role').custom(validRole),
    check('areas', 'Uno o más valores inválidos').custom(validArea),
    requestValidator
] ,createUser);

//Update User
router.put('/:id',[
    check('id', 'El parámetro de búsqueda no es un id de MongoDB válido').isMongoId(),
    requestValidator
], updateUser);



export default router;

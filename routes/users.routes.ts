import {Router} from 'express';
import {check} from 'express-validator';

import { createUser, getUsers } from '../controllers/users.controllers';

const router = Router();

//User listing
router.get('/', getUsers);


//User creation
router.post('/', createUser);




export default router;

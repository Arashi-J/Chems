import {Router} from 'express';
import {check} from 'express-validator';

import { requestValidator } from '../middlewares/middlewares';
import { existingArea } from '../helpers/db-validators';

import { createArea, getAreas } from '../controllers/areas.controllers';



const router = Router();

//List Areas
router.get('/', getAreas);


//Create Area
router.post('/',[
    check('area', 'El nombre del área no puede estar vacío').notEmpty(),
    check('area').custom(existingArea),
    requestValidator
] ,createArea);




export default router;

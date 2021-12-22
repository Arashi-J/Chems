import {Router} from 'express';
import {check} from 'express-validator';

import { createArea, getAreas } from '../controllers/areas.controllers';
import { existingArea } from '../helpers/db-validators';
import { requestValidator } from '../middlewares/middlewares';



const router = Router();

//List Areas
router.get('/', getAreas);


//Create Area
router.post('/',[
    check('area', 'El nombre del área no puede estar vacío').notEmpty(),
    existingArea,
    requestValidator
] ,createArea);




export default router;

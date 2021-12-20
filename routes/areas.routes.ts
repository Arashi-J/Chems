import {Router} from 'express';
import {check} from 'express-validator';

import { createArea, getAreas } from '../controllers/areas.controllers';



const router = Router();

//User listing
router.get('/', getAreas);


//User creation
router.post('/', createArea);




export default router;

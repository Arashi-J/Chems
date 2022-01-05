import { Router } from 'express';
import { param } from 'express-validator';
import { getHazards, getHazard } from '../controllers/hazards.controllers';
import { requestValidator } from '../middlewares/middlewares';


const router = Router();

router.get('/', getHazards);


router.get('/:id', [
    param('id', 'El parámetro de búsqueda no es un MongoID válido').isMongoId(),
    requestValidator
], getHazard);

export default router;
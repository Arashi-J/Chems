import { Router } from 'express';
import { param } from 'express-validator';
import { getPpes, getPpe, showPpeIcon } from '../controllers/ppes.controllers';
import { requestValidator } from '../middlewares/middlewares';

const router = Router();

router.get('/', getPpes);


router.get('/:id', [
    param('id', 'El parámetro de búsqueda no es un MongoID válido').isMongoId(),
    requestValidator
], getPpe);

router.get('/:id/pictogram', [
    param('id', 'El parámetro de búsqueda no es un MongoID válido').isMongoId(),
    requestValidator
], showPpeIcon);


export default router;
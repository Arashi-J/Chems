import { Router } from 'express';
import { check } from 'express-validator';
import { getChemical, getChemicals, createChemical, updateChemical } from '../controllers/chemicals.controller';
import { requestValidator } from '../middlewares/middlewares';

const router = Router();

router.get('/', getChemicals);

router.get('/:id', [
    check('id', 'El ´parámetro de búsqueda no es un MongoDB id válido').isMongoId(),
    requestValidator
], getChemical);

router.post('/', [
    requestValidator
], createChemical);

router.put('/:id', [
    check('id', 'El ´parámetro de búsqueda no es un MongoDB id válido').isMongoId(),
    
    requestValidator
], updateChemical);

export default router;
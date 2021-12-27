import { Router } from 'express';
import { check } from 'express-validator';
import { getChemical, getChemicals, createChemical, updateChemical } from '../controllers/chemicals.controller';
import { existingChemicalId, existingChemical } from '../helpers/db-validators';
import { requestValidator } from '../middlewares/middlewares';

const router = Router();

router.get('/', getChemicals);

router.get('/:id', [
    check('id', 'El ´parámetro de búsqueda no es un MongoDB id válido.').isMongoId(),
    check('id').custom(existingChemicalId),
    requestValidator
], getChemical);

router.post('/', [
    check('chemical').custom(existingChemical),
    requestValidator
], createChemical);

router.put('/:id', [
    check('id', 'El ´parámetro de búsqueda no es un MongoDB id válido.').isMongoId(),
    check('id').custom(existingChemicalId),
    check('id').custom(existingChemical).optional({nullable: true}),
    requestValidator
], updateChemical);

export default router;
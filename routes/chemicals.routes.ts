import { Router } from 'express';
import { check } from 'express-validator';
import { getChemical, getChemicals, createChemical, updateChemical } from '../controllers/chemicals.controller';
import { existingChemicalId, existingChemical, validHazards, validPpes } from '../helpers/db-validators';
import { requestValidator } from '../middlewares/middlewares';

const router = Router();

router.get('/', getChemicals);

router.get('/:id', [
    check('id', 'El ´parámetro de búsqueda no es un MongoDB id válido.').isMongoId(),
    check('id').custom(existingChemicalId),
    requestValidator
], getChemical);

router.post('/', [
    check('chemical', 'Se debe ingresar el nombre del químoco').notEmpty(),
    check('chemical').custom(existingChemical),
    check('status', "el estado debe ser un booleano").isBoolean().optional({ nullable: true }),
    check('hazards').custom(validHazards),
    check('ppes').custom(validPpes),
    requestValidator
], createChemical);

router.put('/:id', [
    check('id', 'El ´parámetro de búsqueda no es un MongoDB id válido.').isMongoId(),
    check('id').custom(existingChemicalId),
    check('chemical').custom(existingChemical).optional({nullable: true}),
    check('status', "el estado debe ser un booleano").isBoolean().optional({ nullable: true }),
    check('hazards').custom(validHazards).optional({nullable: true}),
    check('ppes').custom(validPpes).optional({nullable: true}),
    requestValidator
], updateChemical);

export default router;
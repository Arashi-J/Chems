import { Router } from 'express';
import { check } from 'express-validator';

import { requestValidator } from '../middlewares/middlewares';
import { existingAreaId, existingArea, validChemicals } from '../helpers/db-validators';

import { createArea, getAreas, getArea, updateArea } from '../controllers/areas.controllers';



const router = Router();

//List area
router.get('/', getAreas);

//Look for area by id
router.get('/:id', [
    check('id', 'El parámetro de búsqueda no es un MongoID válido').isMongoId(),
    check('id').custom(existingAreaId),
    requestValidator
], getArea);



//Create area
router.post('/', [
    check('area', 'El nombre del área no puede estar vacío').notEmpty(),
    check('area').custom(existingArea),
    check('status', "el estado debe ser un booleano").isBoolean().optional({ nullable: true }),
    check('chemicals').custom(validChemicals),
    requestValidator
], createArea);

//Update area
router.put('/:id', [
    check('id', 'El parámetro de búsqueda no es un MongoID válido').isMongoId(),
    check('id').custom(existingAreaId).optional({ nullable: true }),
    check('area').custom(existingArea).optional({ nullable: true }),
    check('chemicals').custom(validChemicals).optional({ nullable: true }),
    requestValidator
], updateArea)


export default router;

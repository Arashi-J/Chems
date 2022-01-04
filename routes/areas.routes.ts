import { Router } from 'express';
import { body, param } from 'express-validator';

import { jwtValidator } from '../middlewares/jwt-validator';
import { areaValidator, requestValidator, roleValidator } from '../middlewares/middlewares';

import { existingAreaId, existingArea, validChemicals } from '../helpers/db-validators';

import { createArea, getAreas, getArea, updateArea, updateAreaChemicals } from '../controllers/areas.controllers';



const router = Router();

//List area
router.get('/', getAreas);

//Look for area by id
router.get('/:id', [
    param('id', 'El parámetro de búsqueda no es un MongoID válido').isMongoId(),
    param('id').custom(existingAreaId),
    requestValidator
], getArea);



//Create area
router.post('/', [
    jwtValidator,
    roleValidator('admin'),
    body('area', 'El nombre del área no puede estar vacío').notEmpty(),
    body('area').custom(existingArea),
    body('status', "el estado debe ser un booleano").isBoolean().optional({ nullable: true }),
    body('chemicals').custom(validChemicals).optional({ nullable: true }),
    requestValidator
], createArea);

//Update area
router.put('/:id', [
    jwtValidator,
    roleValidator('admin'),
    param('id', 'El parámetro de búsqueda no es un MongoID válido').isMongoId(),
    param('id').custom(existingAreaId),
    body('area').custom(existingArea).optional({ nullable: true }),
    body('status', "el estado debe ser un booleano").isBoolean().optional({ nullable: true }),
    body('chemicals', 'No se recibió un array de sustancias químicas').isArray().optional({ nullable: true }),
    body('chemicals').custom(validChemicals).optional({ nullable: true }),
    requestValidator
], updateArea);

//Update area's chemicals
router.patch('/:id', [
    jwtValidator,
    param('id', 'El parámetro de búsqueda no es un MongoID válido').isMongoId(),
    param('id').custom(existingAreaId),
    areaValidator,
    body('chemicals', 'No se recibió un array de sustancias químicas').isArray().optional({ nullable: true }),
    body('chemicals').custom(validChemicals).optional({ nullable: true }),
    requestValidator
], updateAreaChemicals);



export default router;

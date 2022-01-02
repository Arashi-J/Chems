import { Router } from 'express';
import { check } from 'express-validator';

import { jwtValidator } from '../middlewares/jwt-validator';
import { areaValidator, requestValidator, roleValidator } from '../middlewares/middlewares';

import { existingAreaId, existingArea, validChemicals } from '../helpers/db-validators';

import { createArea, getAreas, getArea, updateArea, updateAreaChemicals } from '../controllers/areas.controllers';



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
    jwtValidator,
    roleValidator('admin'),
    check('area', 'El nombre del área no puede estar vacío').notEmpty(),
    check('area').custom(existingArea),
    check('status', "el estado debe ser un booleano").isBoolean().optional({ nullable: true }),
    check('chemicals').custom(validChemicals),

    requestValidator
], createArea);

//Update area
router.put('/:id', [
    jwtValidator,
    roleValidator('admin'),
    check('id', 'El parámetro de búsqueda no es un MongoID válido').isMongoId(),
    check('id').custom(existingAreaId),
    check('area').custom(existingArea).optional({ nullable: true }),
    check('status', "el estado debe ser un booleano").isBoolean().optional({ nullable: true }),
    check('chemicals', 'No se recibió un array de sustancias químicas').isArray().optional({ nullable: true }),
    check('chemicals').custom(validChemicals).optional({ nullable: true }),
    requestValidator
], updateArea);

//Update area's chemicals
router.patch('/:id', [
    jwtValidator,
    areaValidator,
    check('id', 'El parámetro de búsqueda no es un MongoID válido').isMongoId(),
    check('id').custom(existingAreaId),
    check('chemicals', 'No se recibió un array de sustancias químicas').isArray().optional({ nullable: true }),
    check('chemicals').custom(validChemicals).optional({ nullable: true }),
    requestValidator
], updateAreaChemicals);



export default router;

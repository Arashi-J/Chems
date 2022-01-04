import { Router } from 'express';
import { body, param } from 'express-validator';

import { jwtValidator } from '../middlewares/jwt-validator';
import { chemApprovalValidation, requestValidator } from '../middlewares/middlewares';

import { existingChemicalId, existingChemical, validHazards, validPpes } from '../helpers/db-validators';

import { getChemical, getChemicals, createChemical, updateChemical, approveChemical } from '../controllers/chemicals.controller';

const router = Router();

router.get('/', getChemicals);

router.get('/:id', [
    param('id', 'El ´parámetro de búsqueda no es un MongoDB id válido.').isMongoId(),
    param('id').custom(existingChemicalId),
    requestValidator
], getChemical);

router.post('/', [
    jwtValidator,
    body('chemical', 'Se debe ingresar el nombre del químico').notEmpty(),
    body('chemical').custom(existingChemical),
    body([
        'hazards',
        'pPhrases',
        'hPhrases',
        'ppes',
        'providers',
        'manufacturers'
    ], 'debe ser un array de valores válidos')
        .isArray().optional({ nullable: true }),
    body([
        'hPhrases.*.code',
        'hPhrases.*.description',
        'pPhrases.*.code',
        'pPhrases.*.description',
    ], 'No se recibieron valor tipo string para code y/o description de las phrases').exists(),
    body([
        'providers[*]',
        'manufacturers[*]',
        'hPhrases.*.code',
        'hPhrases.*.description',
        'pPhrases.*.code',
        'pPhrases.*.description',
        'sds.language',
        'sds.link',
    ], 'Debe ser tipo string')
        .isString().optional({ nullable: true }),
    body('hazards').custom(validHazards).optional({ nullable: true }),
    body('ppes').custom(validPpes).optional({ nullable: true }),
    body('sds.language', 'sds.language debe contener los siguientes valores: ["español", "inglés", "otro", ""]')
        .toLowerCase().isIn(['español', "inglés", 'otro', '']).optional({ nullable: true }),
    body(['status', "sds.status"], 'El campo status y sds.status deben ser tipo boolean')
        .isBoolean().optional({ nullable: true }),
    requestValidator
], createChemical);

router.put('/:id', [
    jwtValidator,
    param('id', 'El ´parámetro de búsqueda no es un MongoDB id válido.').isMongoId(),
    param('id').custom(existingChemicalId),
    body('chemical').custom(existingChemical),
    body([
        'hazards',
        'pPhrases',
        'hPhrases',
        'ppes',
        'providers',
        'manufacturers'
    ], 'debe ser un array de valores válidos')
        .isArray().optional({ nullable: true }),
    body([
        'hPhrases.*.code',
        'hPhrases.*.description',
        'pPhrases.*.code',
        'pPhrases.*.description',
    ], 'No se recibieron valor tipo string para code y/o description de las phrases').exists(),
    body([
        'providers[*]',
        'manufacturers[*]',
        'hPhrases.*.code',
        'hPhrases.*.description',
        'pPhrases.*.code',
        'pPhrases.*.description',
        'sds.language',
        'sds.link',
    ], 'Debe ser tipo string')
        .isString().optional({ nullable: true }),
    body('hazards').custom(validHazards).optional({ nullable: true }),
    body('ppes').custom(validPpes).optional({ nullable: true }),
    body('sds.language', 'sds.language debe contener los siguientes valores: ["español", "inglés", "otro", ""]')
        .toLowerCase().isIn(['español', "inglés", 'otro', '']).optional({ nullable: true }),
    body(['status', "sds.status"], 'El campo status y sds.status deben ser tipo boolean')
        .isBoolean().optional({ nullable: true }),
    requestValidator
], updateChemical);

router.patch('/:id', [
    jwtValidator,
    param('id', 'El parámetro de búsqueda no es un MongoDB id válido.').isMongoId(),
    param('id').custom(existingChemicalId),
    chemApprovalValidation,
    requestValidator
], approveChemical);

export default router;
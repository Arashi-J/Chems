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
    check('hazards').custom(validHazards),
    check('ppes').custom(validPpes),
    check(['pPhrases', 'hPhrases'], 'No se recibió un Array de Phrases').isArray().optional({ nullable: true }),
    check([
        'hPhrases.*.code',
        'pPhrases.*.code',
        'hPhrases.*.description',
        'pPhrases.*.description',
    ], 'Las frases P y H deben ser un arreglo de objetos tipo Phrase: [{code: string, description: string}]').isString(),
    check(['providers', 'manufacturers'], 'El valor ingresado debe ser un Array de tipos String').isArray().optional({ nullable: true }),
    check(['providers[*]', 'manufacturers[*]'], 'Los items del array deben ser tipo string').isString().optional({ nullable: true }),
    check(['status', 'fsms', 'ems', 'oshms'], 'Los campos status, fsms, ems, oshms deben ser tipo Boolean').isBoolean().optional({ nullable: true }),
    requestValidator
], createChemical);

router.put('/:id', [
    check('id', 'El ´parámetro de búsqueda no es un MongoDB id válido.').isMongoId(),
    check('id').custom(existingChemicalId),
    check('chemical').custom(existingChemical).optional({ nullable: true }),
    check('hazards').custom(validHazards).optional({ nullable: true }),
    check('ppes').custom(validPpes).optional({ nullable: true }),
    check(['pPhrases', 'hPhrases'], 'No se recibió un Array de Phrases').isArray().optional({ nullable: true }),
    check([
        'hPhrases.*.code',
        'pPhrases.*.code',
        'hPhrases.*.description',
        'pPhrases.*.description',
    ], 'Las frases P y H deben ser un arreglo de objetos tipo Phrase: [{code: string, description: string}]').isString(),
    check(['providers', 'manufacturers'], 'El valor ingresado debe ser un Array de tipos String').isArray().optional({ nullable: true }),
    check(['providers[*]', 'manufacturers[*]'], 'Los items del array deben ser tipo string').isString().optional({ nullable: true }),
    check(['status', 'fsms', 'ems', 'oshms'], 'Los campos status, fsms, ems, oshms deben ser tipo Boolean').isBoolean().optional({ nullable: true }),
    requestValidator
], updateChemical);

export default router;
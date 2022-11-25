import {Router} from 'express'
import { createCity, deleteCity, findAllCities, findCity, updateCity } from '../controllers/cityController';
import { cityCreateValidation } from '../middlewares/cityvalidations';
import { validateId } from '../middlewares/genericvalidations';

const router = Router()

router.post('/', cityCreateValidation, createCity);
router.get('/', findAllCities);
router.get('/:id', validateId, findCity);
router.patch('/:id', validateId, updateCity);
router.delete('/:id', validateId, deleteCity)

export default router;
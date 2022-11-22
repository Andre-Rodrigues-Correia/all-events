import {Router} from 'express';
import { findAllCountries, findCountry, createCountry, updateCountry, deleteCountry } from '../controllers/countryController';
import { countryCreateValidation } from '../middlewares/countryValidations';
import { validateId } from '../middlewares/genericvalidations';


const router = Router();

router.post('/', countryCreateValidation , createCountry);
router.get('/', findAllCountries);
router.get('/:id', validateId, findCountry);
router.patch('/:id', validateId, updateCountry);
router.delete('/:id', validateId, deleteCountry);


export default router;
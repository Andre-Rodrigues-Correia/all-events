import {Router} from 'express';
import { findAllCountries, findCountry, createCountry, updateCountry, deleteCountry } from '../controllers/countryController';
import { countryCreateValidation } from '../middlewares/countryValidations';


const router = Router();

router.get('/', findAllCountries);
router.get('/:id', findCountry);
router.post('/', countryCreateValidation , createCountry);
router.patch('/:id', updateCountry);
router.delete('/:id', deleteCountry);


export default router;
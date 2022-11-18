import {Router} from 'express';
import { findAllCountries, findCountry, createCountry } from '../controllers/countryController';
import { countryCreateValidation } from '../middlewares/countryValidations';


const router = Router();

router.get('/', findAllCountries)
router.get('/:id', findCountry)
router.post('/', countryCreateValidation , createCountry)


export default router;
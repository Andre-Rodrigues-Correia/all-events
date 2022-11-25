import { Router } from "express";
import { createLocal, findAllLocal, findLocal, updateLocal, deleteLocal, customFind } from "../controllers/localController";
import { validateId } from "../middlewares/genericvalidations";
import { localCreateValidation } from "../middlewares/localValidations";

const router = Router();

router.post('/', localCreateValidation, createLocal);
router.get('/', findAllLocal);
router.get('/:id', validateId, findLocal);
router.patch('/:id', validateId, updateLocal);
router.delete('/:id', validateId, deleteLocal);

//custom routes

router.get('/:findCodition/:id',validateId, customFind);

export default router;
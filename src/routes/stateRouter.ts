import { Router } from "express";
import { createState, findAllStates, findState, updateState, deleteState } from "../controllers/stateController";
import { validateId } from "../middlewares/genericvalidations";
import { stateCreateValidation } from "../middlewares/stateValidations";

const router = Router();

router.post('/',stateCreateValidation, createState);
router.get('/', findAllStates)
router.get('/:id', validateId, findState);
router.patch('/:id', validateId, updateState)
router.delete('/:id', validateId, deleteState)


export default router;
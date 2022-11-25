import { Router } from "express";
import { createType, deleteType, findAllType, findType, updateType } from "../controllers/typeController";
import { typeCreateValidation } from "../middlewares/typeValidations";
import { validateId } from "../middlewares/genericvalidations";

const router = Router();

router.post('/', typeCreateValidation, createType);
router.get('/', findAllType);
router.get('/:id', validateId, findType);
router.patch('/:id', validateId, updateType)
router.delete('/:id', validateId, deleteType);

export default router;
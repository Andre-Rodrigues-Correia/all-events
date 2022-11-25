import { Router } from "express";
import { createCategory, deleteCategory, findAllCategory, findCategory, updateCategory } from "../controllers/categoryController";
import { categoryCreateValidation } from "../middlewares/categoryValidations";
import { validateId } from "../middlewares/genericvalidations";

const router = Router();

router.post('/', categoryCreateValidation, createCategory);
router.get('/', findAllCategory);
router.get('/:id', validateId, findCategory);
router.patch('/:id', validateId, updateCategory)
router.delete('/:id', validateId, deleteCategory);

export default router;
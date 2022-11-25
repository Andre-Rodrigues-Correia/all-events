import { Router } from "express";
import { createEvent, findAllEvent, findEvent, updateEvent, deleteEvent } from "../controllers/eventController";
import { validateId } from "../middlewares/genericvalidations";
import { eventCreateValidation } from "../middlewares/eventValidations";

const router = Router();

router.post('/', eventCreateValidation, createEvent);
router.get('/', findAllEvent);
router.get('/:id', validateId, findEvent);
router.patch('/:id', validateId, updateEvent);
router.delete('/:id', validateId, deleteEvent);

export default router;
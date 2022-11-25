import { Router } from "express";
import { createEvent, findAllEvent, findEvent, customFind, updateEvent, deleteEvent } from "../controllers/eventController";
import { validateId } from "../middlewares/genericvalidations";
import { eventCreateValidation } from "../middlewares/eventValidations";
import { run } from "node:test";

const router = Router();

router.post('/', eventCreateValidation, createEvent);
router.get('/', findAllEvent);
router.get('/:id', validateId, findEvent);
router.patch('/:id', validateId, updateEvent);
router.delete('/:id', validateId, deleteEvent);

//custom routes
router.get('/:findCodition/:id',validateId, customFind);

export default router;
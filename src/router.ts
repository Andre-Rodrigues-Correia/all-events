import { Router } from "express";
import cityEventsRoute from './routes/cityEventsRoute';

const router = Router();

router.use('/eventos', cityEventsRoute);

export default router;



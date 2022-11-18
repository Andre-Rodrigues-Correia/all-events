import { Router } from "express";
import countryRoutes from './routes/countryRouter'

const router = Router();

router.use('/country', countryRoutes);

export default router;



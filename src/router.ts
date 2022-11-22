import { Router } from "express";
import countryRoutes from './routes/countryRouter'
import stateRoutes from './routes/stateRouter'

const router = Router();

router.use('/country', countryRoutes);
router.use('/state', stateRoutes);

export default router;



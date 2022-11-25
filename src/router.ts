import { Router } from "express";
import countryRoutes from './routes/countryRouter'
import stateRoutes from './routes/stateRouter'
import cityRoutes from './routes/cityRouter'
import categoryRoutes from './routes/categoryRouter'
import typeRoutes from './routes/typeRouter'
import localRoutes from './routes/localRouter'
import eventRoutes from './routes/eventRouter'

const router = Router();

router.use('/country', countryRoutes);
router.use('/state', stateRoutes);
router.use('/city', cityRoutes);
router.use('/category', categoryRoutes);
router.use('/type', typeRoutes);
router.use('/local', localRoutes);
router.use('/event', eventRoutes);

export default router;



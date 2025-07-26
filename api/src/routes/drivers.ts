import { Router } from 'express';
import { getNearbyDrivers } from '../controllers/driversController';

const router = Router();

// Rota para obter motoristas próximos
router.get('/nearby', getNearbyDrivers);

export default router;

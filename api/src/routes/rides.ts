import { Router } from 'express';
import {
  createRide,
  updateRideStatus,
  getRidesByStatus,
  getPassengerRides,
  getDriverRides,
} from '../controllers/ridesController';

const router = Router();

// Rota para solicitar uma nova corrida
router.post('/', createRide);

// Rota para atualizar o status de uma corrida (aceitar, iniciar, completar, cancelar)
router.put('/:id/status', updateRideStatus);

// Rota para listar corridas por status
router.get('/', getRidesByStatus);

// Rota para listar histórico de corridas de um passageiro
router.get('/passenger/:passengerId', getPassengerRides);

// Rota para listar histórico de corridas de um motorista
router.get('/driver/:driverId', getDriverRides);

export default router;

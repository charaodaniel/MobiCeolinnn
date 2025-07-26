import { Router } from 'express';
import {
  getNegotiationHistory,
  submitFareProposal,
  respondToProposal,
} from '../controllers/negotiationsController';

const router = Router();

// Rota para obter o histórico de negociação para uma corrida rural
router.get('/ride/:rideId', getNegotiationHistory);

// Rota para um motorista enviar uma proposta de tarifa
router.post('/ride/:rideId', submitFareProposal);

// Rota para um passageiro aceitar ou recusar uma proposta
router.put('/:negotiationId', respondToProposal);

export default router;

import { Router } from 'express';
import { submitRating } from '../controllers/ratingsController';

const router = Router();

// Rota para um passageiro enviar uma avaliação
router.post('/', submitRating);

export default router;

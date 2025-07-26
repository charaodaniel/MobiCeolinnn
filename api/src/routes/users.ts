import { Router } from 'express';
import { getUsers } from '../controllers/usersController';

const router = Router();

// Rota para obter todos os usuários
router.get('/', getUsers);

export default router;

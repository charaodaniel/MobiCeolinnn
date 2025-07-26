import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { registerValidation, loginValidation } from '../validation/authValidation'; // Importa os middlewares de validação

const router = Router();

// Rota para registrar um novo usuário com validação
router.post('/register', registerValidation, register);

// Rota para autenticar um usuário com validação
router.post('/login', loginValidation, login);

export default router;

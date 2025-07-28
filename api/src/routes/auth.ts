import { Router } from 'express';
import { register, login, changePassword, logout } from '../controllers/authController';
import { registerValidation, loginValidation } from '../validation/authValidation';

const router = Router();

// Rota para registrar um novo usuário com validação
router.post('/register', registerValidation, register);

// Rota para autenticar um usuário com validação
router.post('/login', loginValidation, login);

// Rota para alterar a senha do usuário
router.put('/change-password', changePassword);

// Rota para fazer logout do usuário
router.post('/logout', logout);

export default router;

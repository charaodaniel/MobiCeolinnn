import { Router } from 'express';
import { getUsers, updateUser, uploadUserDocument } from '../controllers/usersController'; // Adicionado updateUser e uploadUserDocument

const router = Router();

// Rota para obter todos os usuários
router.get('/', getUsers);

// Rota para atualizar dados de um usuário
router.put('/:userId', updateUser);

// Rota para upload de documento/foto de usuário (placeholder)
router.post('/:userId/upload-document', uploadUserDocument);

export default router;

import { Request, Response } from 'express';
import { Pool } from 'pg';

// Recomenda-se criar um módulo separado para o pool do BD e importá-lo aqui
// const pool = require('../db/pool'); 
// Por enquanto, usando um mock ou instanciando diretamente para o exemplo:

// Exemplo simples de dados de usuário (mockados)
const mockUsers = [
  { id: 1, name: 'Usuário Exemplo 1', email: 'user1@example.com' },
  { id: 2, name: 'Usuário Exemplo 2', email: 'user2@example.com' },
];

export const getUsers = (req: Request, res: Response) => {
  // Aqui você faria a consulta real ao banco de dados Supabase
  // Ex: pool.query('SELECT * FROM users', (err, result) => { ... });

  // Por enquanto, retorna os dados mockados
  res.json(mockUsers);
};

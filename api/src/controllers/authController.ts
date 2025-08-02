import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db';
import { validationResult } from 'express-validator';
import { Pool } from 'pg';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt_padrao';

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role = 'passenger' } = req.body;

  try {
    // Verificar se o usuário já existe
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }

    // Hashear a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Inserir o novo usuário no banco de dados
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, role]
    );

    res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser.rows[0] });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
};

export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  const { email, password } = req.body;

  try {
    // Buscar o usuário no banco de dados pelo email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Comparar a senha fornecida com a senha hasheada no BD
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar um token de autenticação (JWT)
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '7d' }, // Token expira em 7 dias
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
            message: 'Login bem-sucedido',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
      }
    );

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  // Lógica para alterar a senha de um usuário autenticado
  const { userId, oldPassword, newPassword } = req.body;

  try {
    // TODO: Validar dados de entrada
    // TODO: Verificar se o usuário está autenticado (usando middleware de autenticação)
    // TODO: Buscar o usuário no BD e verificar a senha antiga com bcrypt.compare
    // TODO: Hashear a nova senha e atualizar no BD

    console.log(`Tentativa de alteração de senha para o usuário ${userId}`);
    res.status(200).json({ message: 'Senha alterada com sucesso' });

  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({ message: 'Erro ao alterar senha' });
  }
};

export const logout = async (req: Request, res: Response) => {
  // Lógica para fazer logout do usuário
  try {
    // O logout com JWT é tratado no lado do cliente, removendo o token.
    // Nenhuma ação é necessária no servidor, a menos que você tenha uma blacklist de tokens.

    console.log('Usuário deslogado');
    res.status(200).json({ message: 'Logout bem-sucedido' });

  } catch (error) {
    console.error('Erro no logout:', error);
    res.status(500).json({ message: 'Erro ao fazer logout' });
  }
};

export const testDbConnection = async (req: Request, res: Response) => {
  const { host, port, user, password, name } = req.body;
  
  const testPool = new Pool({
    host,
    port: parseInt(port, 10),
    user,
    password,
    database: name,
    connectionTimeoutMillis: 5000, // Timeout de 5 segundos
  });

  try {
    const client = await testPool.connect();
    // Apenas o fato de conectar já valida.
    // Podemos fazer uma query simples para ter certeza.
    await client.query('SELECT NOW()');
    client.release();
    await testPool.end();
    res.status(200).json({ message: 'Conexão com o banco de dados bem-sucedida!' });
  } catch (error: any) {
    await testPool.end();
    console.error('Falha na conexão com o banco de dados:', error.message);
    res.status(500).json({ message: 'Falha ao conectar com o banco de dados.', error: error.message });
  }
};

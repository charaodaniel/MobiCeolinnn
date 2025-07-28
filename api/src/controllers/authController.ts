import { Request, Response } from 'express';
import { Pool } from 'pg';

// Recomenda-se criar um módulo separado para o pool do BD e importá-lo aqui
// import { pool } from '../db/pool'; // Exemplo

export const register = async (req: Request, res: Response) => {
  // Lógica para registrar um novo usuário
  const { name, email, password, role } = req.body; // Exemplo de dados esperados

  try {
    // TODO: Validar os dados de entrada
    // TODO: Hashear a senha antes de salvar
    // TODO: Inserir o novo usuário no banco de dados (tabela de usuários)
    // TODO: Gerar um token de autenticação (ex: JWT) se o usuário fizer login automaticamente após o registro

    // Exemplo de resposta de sucesso (após inserir no BD)
    res.status(201).json({ message: 'Usuário registrado com sucesso' });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
};

export const login = async (req: Request, res: Response) => {
  // Lógica para autenticar um usuário
  const { email, password } = req.body; // Exemplo de dados esperados

  try {
    // TODO: Validar os dados de entrada
    // TODO: Buscar o usuário no banco de dados pelo email
    // TODO: Comparar a senha fornecida com a senha hasheada no BD
    // TODO: Gerar um token de autenticação (ex: JWT) se as credenciais forem válidas

    // Exemplo de verificação básica (não use isso em produção!)
    if (email === 'test@example.com' && password === 'password') {
      // Em produção, aqui você geraria e retornaria um token
      res.status(200).json({ message: 'Login bem-sucedido', token: 'exemplo_token' });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  // Lógica para alterar a senha de um usuário autenticado
  const { userId, oldPassword, newPassword } = req.body; // Exemplo de dados esperados

  try {
    // TODO: Validar dados de entrada
    // TODO: Verificar se o usuário está autenticado
    // TODO: Buscar o usuário no BD e verificar a senha antiga
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
    // TODO: Se estiver usando tokens JWT, o logout é geralmente tratado no lado do cliente
    // (removendo o token). Se estiver usando sessões no servidor, destrua a sessão aqui.
    
    console.log('Usuário deslogado');
    res.status(200).json({ message: 'Logout bem-sucedido' });

  } catch (error) {
    console.error('Erro no logout:', error);
    res.status(500).json({ message: 'Erro ao fazer logout' });
  }
};

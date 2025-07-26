import { body } from 'express-validator';

// Regras de validação para o registro de usuário
export const registerValidation = [
  body('name')
    .notEmpty().withMessage('Nome é obrigatório')
    .isString().withMessage('Nome deve ser uma string'),

  body('email')
    .notEmpty().withMessage('Email é obrigatório')
    .isEmail().withMessage('Email inválido'),

  body('password')
    .notEmpty().withMessage('Senha é obrigatória')
    .isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),

  // Opcional: Validar o campo role, se ele for enviado
  // body('role')
  //   .optional()
  //   .isIn(['passenger', 'driver', 'admin']).withMessage('Role inválido'),
];

// Regras de validação para o login de usuário
export const loginValidation = [
  body('email')
    .notEmpty().withMessage('Email é obrigatório')
    .isEmail().withMessage('Email inválido'),

  body('password')
    .notEmpty().withMessage('Senha é obrigatória'), // Não validar o comprimento da senha no login
];

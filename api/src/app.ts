import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { pool } from './db';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import driversRouter from './routes/drivers';
import ridesRouter from './routes/rides';
import negotiationsRouter from './routes/negotiations';
import ratingsRouter from './routes/ratings';
import type { PoolClient } from 'pg';

import { validationResult } from 'express-validator';

const app = express();
const port = process.env.PORT || 3001;

// Middleware para habilitar CORS
// Isso permite que o seu frontend (rodando em outra porta/domínio) se comunique com a API.
app.use(cors());

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Usar as rotas
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/drivers', driversRouter);
app.use('/api/rides', ridesRouter);
app.use('/api/negotiations', negotiationsRouter);
app.use('/api/ratings', ratingsRouter);

// Middleware para lidar com erros de validação do express-validator
app.use((req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  });

// Middleware genérico para tratamento de outros erros
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Ocorreu um erro no servidor!');
  });

app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor da API rodando em http://localhost:${port}`);
});

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { pool } from './db';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import driversRouter from './routes/drivers';
import ridesRouter from './routes/rides';
import negotiationsRouter from './routes/negotiations';
import ratingsRouter from './routes/ratings';

import { validationResult } from 'express-validator';

const app = express();
const port = process.env.PORT || 3001;

// Configuração de CORS mais específica
const allowedOrigins = [
    'http://localhost:9002', // Frontend local
    'https://62.72.9.108', // Acesso direto ou via proxy
    // Adicione outras origens se necessário
];

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        // Permite requisições sem 'origin' (ex: Postman, apps mobile)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            // Verifica se a origem da requisição começa com a URL base do proxy
            const isProxy = allowedOrigins.some(allowed => origin.startsWith(allowed));
            if (isProxy) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    },
    credentials: true,
};

// Middleware para habilitar CORS com as opções configuradas
app.use(cors(corsOptions));


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
    // Verifica se o erro é de CORS
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({ message: 'Acesso negado pela política de CORS.'});
    }
    res.status(500).send('Ocorreu um erro no servidor!');
  });

app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor da API rodando em http://localhost:${port}`);
});

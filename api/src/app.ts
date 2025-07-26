import express, { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';
import usersRouter from './routes/users'; // Importa o router de usuários
import authRouter from './routes/auth'; // Importa o router de autenticação
import driversRouter from './routes/drivers'; // Importa o router de motoristas
import ridesRouter from './routes/rides'; // Importa o router de corridas

import { validationResult } from 'express-validator'; // Importa validationResult

const app = express();
const port = process.env.PORT || 3001; // Use a porta 3001 por padrão, ou a variável de ambiente PORT

// Configuração básica do pool de conexão com o PostgreSQL
// É ALTAMENTE recomendado usar variáveis de ambiente para as credenciais!
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
});

// Testando a conexão com o banco de dados (opcional)
pool.connect((err, client, done) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    done(err); // Passa o erro para done
    return; // Sai da função
  }

  // Verifica se 'client' existe antes de tentar usar .release()
  if (client) {
    console.log('Conexão bem-sucedida com o banco de dados!');
    client.release(); // Libera o cliente de volta para o pool
  } else {
      // Caso hipotético onde não há erro mas o cliente é undefined (improvável na prática com pg, mas lida com a tipagem)n      console.error('Erro interno: Cliente do banco de dados undefined.');
      done(new Error('Cliente do banco de dados undefined'));
      return;
  }


  done(); // Chama done() apenas no fluxo de sucesso após liberar o cliente
});

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Usar as rotas
app.use('/api/users', usersRouter); // Monta o router de usuários
app.use('/api/auth', authRouter); // Monta o router de autenticação
app.use('/api/drivers', driversRouter); // Monta o router de motoristas
app.use('/api/rides', ridesRouter); // Monta o router de corridas

// Middleware para lidar com erros de validação do express-validator
app.use((req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Se não houver erros de validação, passa para o próximo middleware/rota
  });

// Middleware genérico para tratamento de outros erros (opcional, mas recomendado)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); // Log do erro no servidor
    res.status(500).send('Ocorreu um erro no servidor!');
  });

// Exemplo de rota básica (mantido)
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor da API rodando em http://localhost:${port}`);
});

import { Pool } from 'pg';

// Configuração centralizada do pool de conexão com o PostgreSQL
// As credenciais são lidas das variáveis de ambiente.
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
});

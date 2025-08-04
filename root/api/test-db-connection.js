require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
    const res = await client.query('SELECT NOW()');
    console.log('🕒 Hora atual no banco:', res.rows[0].now);
  } catch (err) {
    console.error('❌ Erro ao conectar no banco:', err);
  } finally {
    await client.end();
  }
}

testConnection();

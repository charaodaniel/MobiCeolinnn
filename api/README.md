# API - CEOLIN Mobilidade Urbana

Esta pasta contém o código-fonte do backend da aplicação CEOLIN Mobilidade Urbana. A API é responsável por toda a lógica de negócio, comunicação com o banco de dados e autenticação.

## Tecnologias Utilizadas

-   **Node.js:** Ambiente de execução para o JavaScript no servidor.
-   **Express.js:** Framework web para a criação das rotas e gerenciamento das requisições HTTP.
-   **TypeScript:** Superset do JavaScript que adiciona tipagem estática, aumentando a robustez e a manutenibilidade do código.
-   **PostgreSQL:** Banco de dados relacional onde todas as informações da aplicação são armazenadas.
-   **jsonwebtoken (JWT):** Para a geração de tokens de autenticação, garantindo que apenas usuários autorizados acessem rotas protegidas.
-   **bcrypt:** Para a criptografia (hashing) de senhas, garantindo que elas sejam armazenadas de forma segura.

---

## Estrutura de Pastas

O código-fonte da API está organizado da seguinte forma:

-   `src/`
    -   `controllers/`: Contém a lógica de negócio de cada rota (o que fazer quando um endpoint é acessado).
    -   `routes/`: Define todos os endpoints da API (ex: `/auth`, `/users`, `/rides`).
    -   `validation/`: Regras de validação para os dados de entrada das requisições.
    -   `app.ts`: Arquivo principal que inicializa o servidor Express, conecta os middlewares e as rotas.
    -   `db.ts`: Configuração centralizada da conexão com o banco de dados PostgreSQL.
    -   `database.sql`: Script SQL com a estrutura inicial das tabelas do banco de dados.

---

## Configuração do Ambiente

Para executar a API localmente ou em um servidor, siga os passos abaixo.

### 1. Instalar as Dependências

Navegue até a pasta `api` e instale os pacotes necessários:

```bash
cd api
npm install
```

### 2. Configurar as Variáveis de Ambiente

Crie um arquivo chamado `.env` na raiz da pasta `api/`. Este arquivo armazenará as credenciais sensíveis e nunca deve ser enviado para o controle de versão (Git).

Copie o conteúdo abaixo para o seu arquivo `api/.env` e preencha com as suas credenciais.

```env
# Credenciais de Conexão Direta com o Banco de Dados PostgreSQL
# Você pode encontrar essas informações no painel do seu projeto Supabase self-hosted
# em "Database" -> "Connection info".
DB_USER=postgres
DB_HOST=seu_ip_da_vps # Ex: 62.72.9.108
DB_NAME=postgres
DB_PASSWORD=sua_senha_do_banco_de_dados_supabase
DB_PORT=5432

# Segredo para Autenticação JWT
# Use uma string longa, complexa e aleatória para segurança.
# Você pode gerar uma em: https://www.lastpass.com/features/password-generator
JWT_SECRET=seu_segredo_super_secreto_para_jwt
```

**Atenção:** Estas variáveis são essenciais para o funcionamento da API. Sem elas, a aplicação não conseguirá se conectar ao banco de dados nem autenticar usuários.

---

## Como Executar a API

### Para Desenvolvimento

Utilize o comando `dev`, que usa o `ts-node` para executar o código TypeScript diretamente, reiniciando o servidor a cada alteração.

```bash
npm run dev
```

O servidor da API estará disponível em `http://localhost:3001` (ou na porta definida no seu ambiente).

### Para Produção

Para um ambiente de produção, primeiro compile o código TypeScript para JavaScript e depois inicie o servidor a partir dos arquivos compilados.

```bash
# 1. Compilar o projeto
npm run build

# 2. Iniciar o servidor
npm start
```

Recomenda-se o uso de um gerenciador de processos como o `pm2` para manter a API rodando de forma estável em um ambiente de produção.

```bash
# Exemplo de como rodar com pm2
pm2 start dist/app.js --name "ceolin-api"
```

---

## Endpoints da API

A API expõe os seguintes grupos de rotas:

-   `/api/auth`: Registro, login e gerenciamento de senhas.
-   `/api/users`: Gerenciamento de dados de usuários.
-   `/api/drivers`: Busca de motoristas próximos.
-   `/api/rides`: Criação e gerenciamento de corridas.
-   `/api/negotiations`: Lógica para negociação de tarifas em corridas rurais.
-   `/api/ratings`: Submissão de avaliações de corridas.

---

## Próximos Passos

Atualmente, as rotas e os controllers estão estruturados, mas a lógica de banco de dados (consultas SQL) dentro dos controllers ainda precisa ser implementada. O próximo grande passo é substituir os comentários `// TODO:` e os dados mocados por interações reais com o banco de dados usando o `pool` de conexão.

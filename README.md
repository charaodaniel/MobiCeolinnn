# CEOLIN Mobilidade Urbana: Seu App de Transporte Inteligente

CEOLIN Mobilidade Urbana é uma plataforma de transporte que conecta passageiros e motoristas de forma eficiente e inovadora, com foco especial em atender tanto demandas urbanas quanto rurais e intermunicipais.

Esta versão do projeto utiliza uma arquitetura robusta e escalável com **Next.js**, **NextAuth** para autenticação, **Prisma** como ORM para interagir com o banco de dados e **PostgreSQL** como nosso banco de dados relacional.

## Arquitetura do Projeto

O projeto adota uma arquitetura moderna e unificada com Next.js. Todo o código, tanto o que roda no servidor para buscar e salvar dados (Server Components, API Routes) quanto o que roda no navegador (Client Components), reside na mesma base de código dentro de `src/`.

- **Autenticação:** Gerenciada pelo `NextAuth`, que lida com sessões, login, e proteção de rotas.
- **Banco de Dados:** O `Prisma` serve como uma ponte segura e eficiente entre a nossa aplicação e o banco de dados `PostgreSQL`, facilitando consultas e a manipulação de dados com segurança de tipos.

## Fluxo de Trabalho de Desenvolvimento

### 1. Configuração do Banco de Dados (Local ou na VPS)

1.  **Instale o PostgreSQL:** Você precisa de uma instância do PostgreSQL rodando. Para desenvolvimento local ou na VPS, a maneira mais fácil é usar o Docker:
    ```bash
    docker run --name mobiceolin-db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mobiceolin -p 5432:5432 -d postgres
    ```
    Isso iniciará um banco de dados PostgreSQL na porta `5432`.
2.  **Obtenha a URL de Conexão:** A URL de conexão para o banco de dados que você acabou de criar será:
    `postgresql://user:password@localhost:5432/mobiceolin`
    Se o banco estiver em uma VPS, substitua `localhost` pelo IP da VPS.

### 2. Configuração do Frontend (Local ou na VPS)

1.  **Clone o projeto:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DO_DIRETORIO>
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure as Variáveis de Ambiente:**
    *   Na raiz do projeto, renomeie o arquivo `.env.example` para `.env.local` (se ainda não existir).
    *   Edite o arquivo `.env.local` e insira a URL de conexão do seu banco de dados:
      ```env
      DATABASE_URL="postgresql://user:password@localhost:5432/mobiceolin"
      
      # Gere um segredo para o NextAuth. Pode ser qualquer string aleatória.
      # Exemplo de como gerar no Linux/Mac: openssl rand -base64 32
      AUTH_SECRET="SEU_SEGREDO_SUPER_SEGURO_AQUI"
      ```
4.  **Execute as Migrações do Banco de Dados:**
    Este comando vai ler seu `schema.prisma` e criar todas as tabelas no banco de dados.
    ```bash
    npx prisma migrate dev --name init
    ```
5.  **Execute a Aplicação:**
    *   **Para Desenvolvimento Local:**
        ```bash
        npm run dev
        ```
        Seu aplicativo estará disponível em `http://localhost:9002`.
    *   **Para Produção na VPS:**
        ```bash
        npm install
        npm run build
        pm2 start npm --name "MobiCeolin" -- run start:prod
        ```
        Seu aplicativo estará disponível publicamente em `http://SEU_IP_DA_VPS:9002`.

## Acessos de Demonstração (Após popular o banco)

- **Administrador:**
  - **Email:** `admin@mobiceolin.com`
  - **Senha:** `admin123`

- **Motorista:**
  - **Email:** `carlos@email.com`
  - **Senha:** `123456`

- **Passageiro:**
  - **Email:** `joao@email.com`
  - **Senha:** `123456`

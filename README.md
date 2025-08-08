# CEOLIN Mobilidade Urbana: Seu App de Transporte Inteligente

CEOLIN Mobilidade Urbana é uma plataforma de transporte que conecta passageiros e motoristas de forma eficiente e inovadora, com foco especial em atender tanto demandas urbanas quanto rurais e intermunicipais.

Esta versão do projeto utiliza **Supabase** como backend, uma alternativa de código aberto ao Firebase que oferece banco de dados, autenticação e mais. A comunicação entre o frontend (Next.js) e o Supabase é feita **diretamente**, utilizando a biblioteca de cliente oficial (`@supabase/supabase-js`), o que simplifica a arquitetura e melhora a performance.

## Arquitetura do Projeto

O projeto adota uma arquitetura moderna e unificada com Next.js. Isso significa que não há uma separação entre uma pasta "frontend" e uma pasta "backend". Todo o código, tanto o que roda no servidor para buscar dados (Server Components) quanto o que roda no navegador do usuário (Client Components), reside na mesma base de código, principalmente dentro de `src/app`.

## Fluxo de Trabalho de Desenvolvimento

O fluxo recomendado é utilizar uma instância gerenciada do Supabase (como a da Hostinger, que você está usando) para o backend e rodar o projeto Next.js na sua máquina local para desenvolvimento. Para produção, o projeto Next.js será executado na sua VPS, conectado ao mesmo Supabase.

### 1. Configuração do Backend (Supabase na Hostinger)

1.  **Crie um Projeto:** Acesse o painel da Hostinger e crie um novo projeto Supabase.
2.  **Obtenha as Credenciais:** Navegue até as configurações do projeto (`Project Settings` -> `API`). Você precisará de duas informações:
    *   **Project URL:** A URL do seu projeto Supabase.
    *   **Project API Keys -> `anon` `public`:** A chave de API anônima e pública.

### 2. Configuração do Frontend (Local ou na VPS)

1.  **Clone o projeto:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DO_DIRETORIO>
    ```
2.  **Configure as Variáveis de Ambiente:**
    *   Na raiz do projeto, renomeie o arquivo `.env` para `.env.local`.
    *   Edite o arquivo `.env.local` e insira as credenciais obtidas no passo anterior:
      ```env
      NEXT_PUBLIC_SUPABASE_URL="A_SUA_URL_DO_SUPABASE_AQUI"
      NEXT_PUBLIC_SUPABASE_ANON_KEY="A_SUA_CHAVE_ANON_PUBLICA_AQUI"
      ```
3.  **Instale as dependências e execute:**
    *   **Para Desenvolvimento Local:**
        ```bash
        npm install
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

## Acessos de Demonstração (Após configurar as tabelas no Supabase)

- **Administrador:**
  - **Email:** `admin@mobiceolin.com`
  - **Senha:** `admin123`

- **Motorista:**
  - **Email:** `carlos@email.com`
  - **Senha:** `123456`

- **Passageiro:**
  - **Email:** `joao@email.com`
  - **Senha:** `123456`

# CEOLIN Mobilidade Urbana: Seu App de Transporte Inteligente

CEOLIN Mobilidade Urbana é uma plataforma de transporte que conecta passageiros e motoristas de forma eficiente e inovadora, com foco especial em atender tanto demandas urbanas quanto rurais e intermunicipais.

Esta versão do projeto utiliza **Supabase** como backend, uma alternativa de código aberto ao Firebase que oferece banco de dados, autenticação e mais. A comunicação entre o frontend e o Supabase é feita diretamente através da biblioteca de cliente oficial (`@supabase/supabase-js`).

## Fluxo de Trabalho de Desenvolvimento

O fluxo recomendado é utilizar uma instância gerenciada do Supabase (como a da Hostinger, Vercel, ou a oficial) para o backend e rodar o frontend (Next.js) na sua máquina local para desenvolvimento.

### 1. Configuração do Backend (No seu provedor Supabase)

1.  **Crie um Projeto:** Acesse o painel do seu provedor e crie um novo projeto Supabase.
2.  **Obtenha as Credenciais:** Navegue até as configurações do projeto (`Project Settings` -> `API`). Você precisará de duas informações:
    *   **Project URL:** A URL do seu projeto Supabase.
    *   **Project API Keys -> `anon` `public`:** A chave de API anônima e pública.

### 2. Configuração do Frontend (Na sua máquina local)

1.  **Clone o projeto (se ainda não o fez):**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DO_DIRETORIO>
    ```
2.  **Configure as Variáveis de Ambiente:**
    *   Na raiz do projeto, renomeie (ou crie) o arquivo `.env` para `.env.local`.
    *   Edite o arquivo `.env.local` e insira as credenciais obtidas no passo anterior:
      ```env
      NEXT_PUBLIC_SUPABASE_URL="A_SUA_URL_DO_SUPABASE_AQUI"
      NEXT_PUBLIC_SUPABASE_ANON_KEY="A_SUA_CHAVE_ANON_PUBLICA_AQUI"
      ```
3.  **Instale as dependências e execute:**
    ```bash
    npm install
    npm run dev
    ```
4.  Seu aplicativo estará disponível em `http://localhost:9002` e se comunicará diretamente com sua instância do Supabase.

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

# CEOLIN Mobilidade Urbana: Seu App de Transporte Inteligente

CEOLIN Mobilidade Urbana é uma plataforma de transporte que conecta passageiros e motoristas de forma eficiente e inovadora, com foco especial em atender tanto demandas urbanas quanto rurais e intermunicipais.

Esta versão do projeto utiliza **Appwrite** como backend auto-hospedado, uma alternativa de código aberto ao Firebase que oferece banco de dados, autenticação e mais. A comunicação entre o frontend (Next.js) e o Appwrite é feita **diretamente**, utilizando a biblioteca de cliente oficial (`appwrite`), o que simplifica a arquitetura.

## Arquitetura do Projeto

O projeto adota uma arquitetura moderna e unificada com Next.js. Isso significa que não há uma separação entre uma pasta "frontend" e uma pasta "backend". Todo o código, tanto o que roda no servidor para buscar dados (Server Components) quanto o que roda no navegador do usuário (Client Components), reside na mesma base de código, principalmente dentro de `src/app`.

## Fluxo de Trabalho de Desenvolvimento

O fluxo recomendado é utilizar sua instância auto-hospedada do Appwrite para o backend e rodar o projeto Next.js na sua máquina local para desenvolvimento. Para produção, o projeto Next.js será executado na sua VPS, conectado ao mesmo Appwrite.

### 1. Configuração do Backend (Appwrite na sua VPS)

1.  **Siga o Guia de Instalação:** Use o guia oficial do Appwrite para instalar o serviço na sua VPS usando Docker.
2.  **Obtenha as Credenciais:** Após a instalação, acesse o painel do Appwrite. Navegue até o seu projeto e depois para as configurações (`Settings`). Você precisará de duas informações:
    *   **Project ID:** O ID do seu projeto Appwrite.
    *   **API Endpoint:** A URL do seu servidor Appwrite.

### 2. Configuração do Frontend (Local ou na VPS)

1.  **Clone o projeto:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DO_DIRETORIO>
    ```
2.  **Configure as Variáveis de Ambiente:**
    *   Na raiz do projeto, renomeie o arquivo `.env.example` para `.env.local`.
    *   Edite o arquivo `.env.local` e insira as credenciais obtidas no passo anterior:
      ```env
      NEXT_PUBLIC_APPWRITE_ENDPOINT="A_SUA_URL_DO_APPWRITE_AQUI"
      NEXT_PUBLIC_APPWRITE_PROJECT_ID="O_SEU_PROJECT_ID_AQUI"
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

## Acessos de Demonstração (Após configurar os usuários no Appwrite)

- **Administrador:**
  - **Email:** `admin@mobiceolin.com`
  - **Senha:** `admin123`

- **Motorista:**
  - **Email:** `carlos@email.com`
  - **Senha:** `123456`

- **Passageiro:**
  - **Email:** `joao@email.com`
  - **Senha:** `123456`

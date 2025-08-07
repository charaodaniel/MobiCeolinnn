# CEOLIN Mobilidade Urbana: Seu App de Transporte Inteligente

CEOLIN Mobilidade Urbana é uma plataforma de transporte que conecta passageiros e motoristas de forma eficiente e inovadora, com foco especial em atender tanto demandas urbanas quanto rurais e intermunicipais.

Esta versão do projeto utiliza **Supabase** como backend, uma alternativa de código aberto ao Firebase que oferece banco de dados, autenticação e mais, com a flexibilidade da auto-hospedagem (self-hosting).

## Como Começar (Ambiente com Supabase)

### 1. Preparando o Ambiente (VPS)

Antes de tudo, você precisa de um ambiente com Docker e Git. O script abaixo automatiza todo o processo, reinstalando o Docker para garantir uma versão limpa e compatível, e clonando o repositório do Supabase.

1.  **Envie o script de reinstalação para sua VPS.**
2.  **Dê permissão de execução:** `chmod +x reinstall-supabase.sh`
3.  **Execute-o como sudo:**
    ```bash
    sudo ./reinstall-supabase.sh
    ```
    Este script cuidará de tudo, desde a instalação do Docker até a configuração dos arquivos do Supabase com as credenciais corretas.

### 2. Iniciando o Projeto

Após a preparação do ambiente, você pode iniciar todos os serviços (Supabase e a API de backend) com um único comando.

1.  **Navegue até o diretório da API (se não estiver lá):**
    ```bash
    cd /root/api
    ```
2.  **Execute o script de inicialização:**
    ```bash
    ./start-project.sh
    ```
    Este script irá:
    -   Iniciar os contêineres do Supabase em segundo plano.
    -   Aguardar o banco de dados ficar pronto.
    -   Iniciar a API Node.js usando `pm2` para mantê-la rodando.

### 3. Configurando o Frontend (Interface do Usuário)

1.  **Clone o repositório (se ainda não o fez):**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DO_DIRETORIO>
    ```
2.  **Configure as Variáveis de Ambiente do Frontend:**
    -   Crie um arquivo chamado `.env.local` na raiz do projeto.
    -   Adicione a URL da sua API de backend.
      ```env
      # URL da API de Backend
      # O IP deve ser o da sua VPS onde o Supabase e a API estão rodando.
      NEXT_PUBLIC_API_URL=http://SEU_IP_DA_VPS:3001/api
      ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
5.  A aplicação estará disponível em `http://localhost:9002`.

## Acessos de Demonstração

- **Administrador:**
  - **Email:** `admin@mobiceolin.com`
  - **Senha:** `admin123`

- **Motorista:**
  - **Email:** `carlos@email.com`
  - **Senha:** `123456`

- **Passageiro:**
  - **Email:** `joao@email.com`
  - **Senha:** `123456`

## Tecnologias Utilizadas

- **Backend:** Supabase (Docker), Node.js (Express)
- **Frontend:** React, Next.js, TypeScript, Tailwind CSS
- **IA:** Genkit
- **Banco de Dados:** PostgreSQL (via Supabase)
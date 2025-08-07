# CEOLIN Mobilidade Urbana: Seu App de Transporte Inteligente

CEOLIN Mobilidade Urbana é uma plataforma de transporte que conecta passageiros e motoristas de forma eficiente e inovadora, com foco especial em atender tanto demandas urbanas quanto rurais e intermunicipais.

Esta versão do projeto utiliza **Supabase** como backend, uma alternativa de código aberto ao Firebase que oferece banco de dados, autenticação e mais, com a flexibilidade da auto-hospedagem (self-hosting).

## Fluxo de Trabalho de Desenvolvimento

O fluxo recomendado é executar o backend (Supabase e API) na sua VPS e o frontend (Next.js) na sua máquina local.

### 1. Configuração do Backend (Na sua VPS)

1.  **Clone o projeto para a VPS:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DO_DIRETORIO>
    ```
2.  **Execute o script de instalação do Supabase:** Este script prepara todo o ambiente Docker e Supabase.
    ```bash
    chmod +x reinstall-supabase.sh
    sudo ./reinstall-supabase.sh
    ```
3.  **Envie a pasta `api` para a VPS (se não clonou o repo inteiro):**
    ```bash
    # No seu computador local
    scp -r api/ root@SEU_IP_DA_VPS:/root/
    ```
4.  **Inicie todos os serviços do backend:**
    ```bash
    cd /root/api
    chmod +x start-project.sh
    ./start-project.sh
    ```
    Isso iniciará o Supabase e a API Node.js. Sua API estará rodando em `http://SEU_IP_DA_VPS:3001`.

### 2. Configuração do Frontend (Na sua máquina local)

1.  **Configure as Variáveis de Ambiente:**
    -   Certifique-se de que você tem o projeto na sua máquina local.
    -   Na raiz do projeto, edite o arquivo `.env.local`.
    -   Altere a variável `NEXT_PUBLIC_API_URL` para apontar para o IP da sua VPS onde a API está rodando.
      ```env
      NEXT_PUBLIC_API_URL=http://SEU_IP_DA_VPS:3001/api
      ```
2.  **Instale as dependências e execute:**
    ```bash
    npm install
    npm run dev
    ```
3.  Seu aplicativo estará disponível em `http://localhost:9002` e se comunicará com a API na sua VPS.

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

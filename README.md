## CEOLIN Mobilidade Urbana: Seu App de Transporte Inteligente

CEOLIN Mobilidade Urbana é uma plataforma de transporte que conecta passageiros e motoristas de forma eficiente e inovadora, com foco especial em atender tanto demandas urbanas quanto rurais e intermunicipais.

## Funcionalidades Principais

### Para Passageiros
- **Solicitação de Corrida:** Interface simples para inserir locais de partida (manual ou via geolocalização) e destino (opcional).
- **Estimativa de Tarifa:** Cálculo automático do valor estimado para corridas urbanas.
- **Negociação para Corridas Rurais/Intermunicipais:** Um sistema inovador onde o passageiro pode solicitar uma corrida para o interior/outra cidade e receber propostas de motoristas. Um fluxo de IA (Genkit) ajuda a mediar e sugerir um valor justo.
- **Visualização de Motoristas:** Veja motoristas disponíveis nas proximidades, com detalhes do perfil, veículo e avaliações.
- **Chat para Negociação:** Ferramenta de chat para combinar valores e detalhes diretamente com o motorista.
- **Autenticação Opcional:** O passageiro pode pedir uma corrida sem se cadastrar, mas tem a opção de criar uma conta para salvar seu histórico e informações.

### Para Motoristas
- **Painel de Controle:** Acesse um painel exclusivo após o login.
- **Gerenciamento de Perfil:** Atualize informações pessoais, do veículo, documentos (CNH, CRLV) e chave PIX.
- **Status de Disponibilidade:** Alterne facilmente entre os status "Online", "Offline", "Em Viagem (Urbano)" e "Em Viagem (Interior/Intermunicipal)".
- **Recebimento de Solicitações:** Aceite ou recuse corridas urbanas e propostas de negociação.
- **Iniciar Corrida Manualmente:** Registre corridas para passageiros captados na rua, sem a necessidade de um pedido via app.
- **Histórico e Relatórios:** Visualize um registro de todas as corridas realizadas e exporte relatórios detalhados em PDF e CSV.

### Para Administradores
- **Painel de Gerenciamento:** Uma área restrita para administração da plataforma.
- **Gerenciamento de Usuários:** Adicione, remova, ative ou desative contas de passageiros, motoristas e outros administradores. Defina e altere senhas.
- **Relatórios por Motorista:** Gere relatórios de corrida em PDF para motoristas específicos.
- **Log de Atividades:** Monitore o histórico de status (online, offline, etc.) de cada motorista.

## Como Começar

### 1. Configurando o Frontend (Interface do Usuário)

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DO_DIRETORIO>
    ```
2.  **Configure as Variáveis de Ambiente do Frontend:**
    - Crie um arquivo chamado `.env.local` na raiz principal do projeto.
    - Este arquivo guardará as chaves públicas do seu projeto Supabase, permitindo que a interface se comunique com os serviços de autenticação e APIs.
    - Copie o conteúdo abaixo para o seu arquivo `.env.local` e preencha com suas credenciais do Supabase:
      ```env
      # Credenciais do Cliente Supabase (Frontend)
      # Estas são seguras para serem expostas no navegador.
      NEXT_PUBLIC_SUPABASE_URL=http://SEU_IP_DA_VPS:8000
      NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_publica_do_supabase
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

### 2. Configurando o Backend (API)

O backend é um projeto Node.js/Express localizado na pasta `/api`.

1.  **Navegue até a pasta da API:**
    ```bash
    cd api
    ```
2.  **Instale as dependências da API:**
    ```bash
    npm install
    ```
3.  **Configure as Variáveis de Ambiente do Backend:**
    - Crie um arquivo chamado `.env` dentro da pasta `/api`.
    - Este arquivo guardará as credenciais de **conexão direta** com seu banco de dados PostgreSQL (que está rodando no Supabase self-hosted) e o segredo para os tokens de autenticação (JWT). **Estas credenciais são sensíveis e nunca devem ser expostas no código-fonte ou no frontend.**
    - Você pode encontrar as informações de conexão direta no painel do seu projeto Supabase, em "Database" -> "Connection info".
    - Copie o conteúdo abaixo para o seu arquivo `api/.env` e preencha com suas credenciais:
      ```env
      # Credenciais de Conexão Direta com o Banco de Dados PostgreSQL
      DB_USER=postgres
      DB_HOST=seu_ip_da_vps # Ex: 62.72.9.108
      DB_NAME=postgres
      DB_PASSWORD=sua_senha_do_banco_de_dados_supabase
      DB_PORT=5432

      # Segredo para Autenticação JWT
      # Use uma string longa, complexa e aleatória para segurança
      JWT_SECRET=seu_segredo_super_secreto_para_jwt
      ```
4.  **Execute o servidor da API:**
    ```bash
    npm run dev
    ```
5.  O servidor da API estará disponível em `http://localhost:3001`.

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

## Documentação Adicional

- **api/src/database.sql:** Script SQL inicial para a criação das tabelas no banco de dados.
- **docs/APRESENTACAO_CLIENTE.md:** Resumo do status do projeto para apresentação.
- **CHANGELOG.md:** Histórico de mudanças da aplicação.

## Estrutura do Projeto

O projeto é organizado da seguinte forma:

- `/api`: Contém o código do backend da aplicação.
- `/src`: Contém o código do frontend da aplicação (Next.js), incluindo componentes, páginas e hooks.
- `/docs`: Contém a documentação adicional do projeto.
- `/public`: Contém arquivos estáticos, como o manifesto do PWA.

## Tecnologias Utilizadas

- **Backend:** Node.js, Express, TypeScript, PostgreSQL
- **Frontend:** React, Next.js, TypeScript, Tailwind CSS
- **IA:** Genkit

## Próximos Passos

- Implementar as consultas ao banco de dados nos controllers da API, substituindo os dados mocados.
- Conectar a interface do frontend com os endpoints da API para realizar operações reais.
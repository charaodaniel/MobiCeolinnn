
# Roteiro de Desenvolvimento: CEOLIN Mobilidade Urbana

Este documento descreve as etapas concluídas e as tarefas pendentes para levar a aplicação a um estado de produção.

---

## ✅ Fase 1: Fundação e Configuração (Concluído)

Esta fase estabeleceu a base do projeto, a estrutura do código e a configuração do ambiente.

-   **[X] Estrutura do Projeto:** Criação da estrutura de pastas para o frontend (Next.js) e backend (API Node.js).
-   **[X] Prototipagem da Interface (UI):** Desenvolvimento de todas as telas e componentes visuais para os fluxos do passageiro, motorista e administrador usando Next.js e ShadCN.
-   **[X] Estrutura da API:** Definição de rotas, controllers e validações para todos os endpoints necessários.
-   **[X] Configuração do Ambiente do Servidor:**
    -   Instalação e configuração do Supabase via Docker na VPS.
    -   Criação do banco de dados com as tabelas iniciais (`database.sql`).
-   **[X] Configuração de Variáveis de Ambiente:**
    -   Configurado `api/.env` para a conexão da API com o banco de dados.
    -   Configurado `.env.local` para a comunicação do frontend com a API.
-   **[X] Teste de Conexão com o Banco:** Verificação e depuração bem-sucedida da conexão entre a API e o banco de dados PostgreSQL do Supabase.
-   **[X] Script de Automação:** Criação do script `start-project.sh` para iniciar todos os serviços (Supabase + API) com um único comando.

---

## ⏳ Fase 2: Implementação da Lógica de Negócio (Próximos Passos)

Esta é a fase principal de desenvolvimento, onde conectaremos a interface com a lógica real no backend, substituindo os dados de exemplo por interações reais com o banco de dados.

### 1. Autenticação e Segurança da API
-   **[ ] Criar Middleware de Autenticação (JWT):** Proteger as rotas da API para garantir que apenas usuários autenticados (com o token JWT válido) possam acessar endpoints restritos (ex: visualizar perfil, solicitar corrida).

### 2. Implementar os `Controllers` da API

O trabalho aqui é substituir os comentários `// TODO:` e os dados mocados nos arquivos de controller por consultas SQL reais usando o `pool` de conexão.

-   **[ ] `authController.ts`:**
    -   `changePassword`: Implementar a lógica para alterar a senha de um usuário autenticado.

-   **[ ] `usersController.ts`:**
    -   `updateUser`: Implementar a query `UPDATE` para salvar alterações no perfil do usuário.
    -   `uploadUserDocument`: Conectar com o Supabase Storage para salvar arquivos (fotos, CNH, CRLV) e salvar a URL no banco de dados.

-   **[ ] `driversController.ts`:**
    -   `getNearbyDrivers`: Implementar uma consulta geoespacial (provavelmente usando PostGIS no Supabase) para encontrar motoristas online dentro de um raio específico.

-   **[ ] `ridesController.ts`:**
    -   `createRide`: Implementar a query `INSERT` para criar uma nova corrida.
    -   `updateRideStatus`: Implementar a query `UPDATE` para alterar o status da corrida (aceita, iniciada, concluída, cancelada).
    -   `getRidesByStatus`, `getPassengerRides`, `getDriverRides`: Implementar as queries `SELECT` correspondentes para buscar históricos.

-   **[ ] `negotiationsController.ts`:**
    -   Implementar toda a lógica de `SELECT`, `INSERT` e `UPDATE` para gerenciar o histórico de mensagens e propostas do chat de negociação.

-   **[ ] `ratingsController.ts`:**
    -   `submitRating`: Implementar a query `INSERT` para salvar uma nova avaliação e, opcionalmente, recalcular a nota média do motorista.

### 3. Conectar o Frontend com a API
-   **[ ] Substituir Dados Estáticos:** Percorrer os componentes do frontend e substituir os dados mocados (listas de usuários, histórico de corridas, etc.) por chamadas `fetch` para os endpoints da API recém-implementados.
-   **[ ] Gerenciamento de Estado de Autenticação:** Usar Context API ou outra biblioteca de gerenciamento de estado no React para armazenar o token de autenticação e os dados do usuário logado, controlando o que é exibido na interface.

---

## 🚀 Fase 3: Testes e Produção

-   **[ ] Testes de Ponta a Ponta:** Realizar testes completos em todos os fluxos de usuário para garantir que tudo funcione como esperado.
-   **[ ] Otimização:** Analisar e otimizar a performance da aplicação e das consultas ao banco de dados.
-   **[ ] Deploy Final:** O deploy já está basicamente feito na sua VPS. Esta etapa seria a "virada de chave" para o uso público.


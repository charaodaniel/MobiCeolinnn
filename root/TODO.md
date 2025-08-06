# Roteiro de Desenvolvimento: CEOLIN Mobilidade Urbana (com Appwrite)

Este documento descreve as etapas concluídas e as tarefas pendentes para levar a aplicação a um estado de produção usando Appwrite como backend.

---

## ✅ Fase 1: Fundação e Migração para Appwrite (Concluído)

Esta fase estabeleceu a base do projeto e migrou a arquitetura para usar Appwrite.

-   **[X] Estrutura do Projeto:** Criação da estrutura de pastas para o frontend (Next.js).
-   **[X] Prototipagem da Interface (UI):** Desenvolvimento de todas as telas e componentes visuais para os fluxos do passageiro, motorista e administrador.
-   **[X] Decisão Arquitetural:** Migração do backend de uma API Node.js + Supabase para uma solução auto-hospedada com **Appwrite** para melhor performance e eficiência de recursos.
-   **[X] Remoção da API Antiga:** O diretório `api/` foi removido.
-   **[X] Script de Automação:** Criação do script `appwrite-init.sh` para facilitar a instalação do Docker e do Appwrite na VPS.
-   **[X] Atualização da Documentação:** `README.md` e este `TODO.md` foram atualizados para refletir a nova arquitetura.

---

## ⏳ Fase 2: Configuração e Implementação do Backend Appwrite

Esta é a fase principal de desenvolvimento, onde configuraremos o Appwrite e conectaremos a interface com seus serviços.

### 1. Configuração no Painel do Appwrite
-   **[ ] Criar Projeto:** Após iniciar o Appwrite, criar um novo projeto no painel web.
-   **[ ] Configurar Autenticação:** Habilitar os provedores de autenticação necessários (ex: Email/Senha).
-   **[ ] Definir Coleções no Banco de Dados (Appwrite Database):**
    -   Criar uma coleção para `users` (com atributos como `name`, `role`, `pixKey`, etc.).
    -   Criar uma coleção para `vehicles` (associada a um usuário motorista).
    -   Criar uma coleção para `rides` (corridas).
    -   Criar uma coleção para `negotiations` (mensagens de negociação).
    -   Definir os atributos e permissões para cada coleção.
-   **[ ] Configurar Armazenamento (Appwrite Storage):**
    -   Criar um "bucket" para fotos de perfil e de veículos.
    -   Criar um "bucket" para documentos (CNH, CRLV).
    -   Definir as permissões de acesso para cada bucket.

### 2. Conectar o Frontend com a API do Appwrite
-   **[ ] Configurar o SDK do Appwrite:** Inicializar o SDK do Appwrite no frontend com as credenciais do projeto.
-   **[ ] Implementar Fluxo de Autenticação:**
    -   Refatorar `PassengerAuthForm` e `DriverLoginPage` para usar as funções `account.create()` e `account.createEmailPasswordSession()` do SDK do Appwrite.
    -   Gerenciar o estado de login do usuário no frontend.
-   **[ ] Substituir Dados Estáticos por Chamadas ao Appwrite:**
    -   **Perfil do Motorista:** Usar o SDK do Appwrite para buscar e atualizar dados do usuário e do veículo, e para fazer upload de documentos para o Storage.
    -   **Histórico de Corridas:** Buscar os dados da coleção `rides` para exibir o histórico para passageiros e motoristas.
    -   **Solicitação de Corrida:** Criar novos documentos na coleção `rides` ao solicitar uma nova corrida.

### 3. Implementar Lógica de Negócio com Appwrite Functions
-   **[ ] Função de Negociação (Genkit):** A lógica do `negotiate-fare.ts` pode ser portada para uma Appwrite Function. Essa função será chamada pelo frontend durante a negociação de corridas rurais.
-   **[ ] Funções de Gatilho (Triggers):**
    -   Criar uma função que é acionada quando uma avaliação é adicionada para recalcular a nota média do motorista.
    -   Criar funções para notificar usuários (ex: quando um motorista aceita uma corrida).

---

## 🚀 Fase 3: Testes e Produção

-   **[ ] Testes de Ponta a Ponta:** Realizar testes completos em todos os fluxos de usuário.
-   **[ ] Otimização:** Analisar e otimizar a performance da aplicação.
-   **[ ] Deploy Final:** Configurar o Appwrite com o domínio de produção e garantir que a aplicação frontend esteja apontando para o endpoint correto.

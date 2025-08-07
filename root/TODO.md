# Roteiro de Desenvolvimento: CEOLIN Mobilidade Urbana (com Supabase)

Este documento descreve as etapas concluídas e as tarefas pendentes para levar a aplicação a um estado de produção usando Supabase como backend auto-hospedado.

---

## ✅ Fase 1: Fundação e Reestruturação do Backend (Concluído)

Esta fase estabeleceu a base do projeto e a infraestrutura do backend com uma solução mais robusta.

-   **[X] Estrutura do Projeto:** Criação da estrutura de pastas para o frontend (Next.js).
-   **[X] Prototipagem da Interface (UI):** Desenvolvimento de todas as telas e componentes visuais para os fluxos do passageiro, motorista e administrador.
-   **[X] Decisão Arquitetural:** Pivô da solução de backend para **Supabase** auto-hospedado para maior estabilidade e escalabilidade.
-   **[X] Reintrodução da API:** O diretório `api/` foi restaurado e configurado para atuar como um intermediário entre o frontend e o banco de dados do Supabase.
-   **[X] Criação de Scripts de Automação:**
    -   `reinstall-supabase.sh`: Script para automatizar a instalação do Docker e a configuração completa do Supabase.
    -   `start-project.sh`: Script para iniciar todos os serviços (Supabase e API).
    -   `test-db-connection.js`: Utilitário para verificar a conectividade com o banco de dados.
-   **[X] Atualização da Documentação:** `README.md` e este `TODO.md` foram atualizados para refletir a nova arquitetura com Supabase.

---

## ⏳ Fase 2: Conexão Frontend-Backend e Lógica de Negócio

Esta é a fase principal de desenvolvimento, onde conectaremos a interface com a nossa API e o Supabase.

### 1. Validar a Conexão com a API
-   **[ ] Testar Endpoints:** Verificar se os endpoints da API (`/api/users`, `/api/auth/login`, etc.) estão funcionando corretamente e se comunicando com o banco de dados Supabase.
-   **[ ] Configurar Variáveis de Ambiente:** Garantir que o arquivo `.env.local` no frontend está apontando para o endereço IP correto da VPS onde a API está rodando (`NEXT_PUBLIC_API_URL`).

### 2. Conectar o Frontend com a API
-   **[ ] Implementar Fluxo de Autenticação:**
    -   Refatorar `DriverLoginPage` (`src/app/driver/login/page.tsx`) para fazer uma chamada `fetch` para o endpoint `/api/auth/login`.
    -   Refatorar `PassengerAuthForm` para usar a API para login e registro de passageiros.
    -   Implementar uma solução para armazenar o token JWT no cliente (ex: `localStorage` ou cookies) e enviá-lo nas requisições autenticadas.
-   **[ ] Substituir Dados Estáticos por Chamadas à API:**
    -   **Perfil do Motorista:** Conectar a página de perfil (`src/components/driver/ProfileForm.tsx`) para buscar e atualizar os dados do motorista via API.
    -   **Histórico de Corridas:** Buscar os dados da tabela `rides` no Supabase através da API para exibir o histórico para passageiros e motoristas.
    -   **Solicitação de Corrida:** Criar novos registros na tabela `rides` ao solicitar uma nova corrida.

### 3. Implementar Lógica de Negócio e IA
-   **[ ] Refatorar Negociação com Genkit:** A lógica do `negotiate-fare.ts` deve ser integrada ao fluxo de solicitação de corrida rural, sendo chamada pela API quando necessário.
-   **[ ] Upload de Documentos:** Implementar a lógica de upload de arquivos (CNH, CRLV) usando o `Supabase Storage`. A API deve gerar uma URL de upload segura, e o frontend a utiliza para enviar o arquivo diretamente ao Supabase.

---

## 🚀 Fase 3: Testes e Produção

-   **[ ] Testes de Ponta a Ponta:** Realizar testes completos em todos os fluxos de usuário.
-   **[ ] Otimização:** Analisar e otimizar a performance da aplicação e das consultas ao banco de dados.
-   **[ ] Deploy Final:** Configurar o Supabase e a API com o domínio de produção e garantir que a aplicação frontend esteja apontando para o endpoint correto.
-   **[ ] Configurar Certificados SSL:** Proteger o tráfego entre o cliente e o servidor com HTTPS.

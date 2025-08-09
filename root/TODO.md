# Roteiro de Desenvolvimento: CEOLIN Mobilidade Urbana (com Appwrite)

Este documento descreve as etapas concluídas e as tarefas pendentes para levar a aplicação a um estado de produção usando uma instância auto-hospedada do Appwrite.

---

## ✅ Fase 1: Fundação e Arquitetura do Backend (Concluído)

Esta fase estabeleceu a base do projeto e a infraestrutura do backend.

-   **[X] Estrutura do Projeto:** Criação da estrutura de pastas para o frontend (Next.js).
-   **[X] Prototipagem da Interface (UI):** Desenvolvimento de todas as telas e componentes visuais para os fluxos do passageiro, motorista e administrador.
-   **[X] Decisão Arquitetural:** Utilização de uma instância **Appwrite auto-hospedada** para controle total sobre o ambiente.
-   **[X] Instalação do Cliente Appwrite:** Adição do pacote `appwrite` ao projeto.
-   **[X] Configuração do Cliente Appwrite:** Criação de um cliente reutilizável em `src/lib/appwrite/client.ts` e configuração das variáveis de ambiente em `.env.local`.
-   **[X] Atualização da Documentação:** `README.md` e este `TODO.md` foram atualizados para refletir a nova arquitetura.

---

## ⏳ Fase 2: Conexão Frontend-Appwrite e Lógica de Negócio

Esta é a fase principal de desenvolvimento, onde conectaremos toda a interface com o Appwrite.

### 1. Implementar o Fluxo de Autenticação Completo
-   **[X] Refatorar Login do Motorista:** A página `src/app/driver/login/page.tsx` foi atualizada para usar `account.createEmailPasswordSession` do Appwrite.
-   **[ ] Refatorar Registro/Login do Passageiro:** Conectar `PassengerAuthForm` para usar os métodos de autenticação do Appwrite.
-   **[ ] Gerenciamento de Sessão:** Implementar a lógica para manter o usuário logado e proteger as rotas que exigem autenticação. Utilizar `account.get()` para verificar a sessão do usuário.

### 2. Substituir Dados Estáticos por Chamadas ao Appwrite
-   **[ ] Perfil do Motorista:** Conectar a página de perfil (`src/components/driver/ProfileForm.tsx`) para buscar e atualizar os dados do motorista da coleção apropriada no Appwrite.
-   **[ ] Histórico de Corridas:** Buscar os dados da coleção `rides` no Appwrite para exibir o histórico para passageiros e motoristas.
-   **[ ] Solicitação de Corrida:** Criar novos documentos na coleção `rides` ao solicitar uma nova corrida.
-   **[ ] Gerenciamento de Usuários (Admin):** Conectar a `UserManagementTable` para buscar, criar e atualizar usuários diretamente no Appwrite.

### 3. Implementar Funcionalidades Avançadas com Appwrite
-   **[ ] Refatorar Negociação com Genkit:** A lógica do `negotiate-fare.ts` deve ser integrada ao fluxo de solicitação de corrida, possivelmente sendo chamada por uma *Appwrite Function* quando uma corrida rural for criada.
-   **[ ] Upload de Documentos:** Implementar a lógica de upload de arquivos (CNH, CRLV) usando o `Appwrite Storage`. O frontend obterá permissão do Appwrite e enviará o arquivo diretamente.

---

## 🚀 Fase 3: Testes e Produção

-   **[ ] Testes de Ponta a Ponta:** Realizar testes completos em todos os fluxos de usuário.
-   **[ ] Segurança:** Revisar e implementar as permissões de acesso em coleções e documentos no Appwrite para garantir que os usuários só possam acessar e modificar os dados que lhes são permitidos.
-   **[ ] Otimização:** Analisar e otimizar a performance da aplicação e das consultas ao banco de dados.
-   **[ ] Deploy Final:** Configurar a aplicação frontend com o domínio de produção e garantir que ela aponte para as credenciais corretas do projeto Appwrite.

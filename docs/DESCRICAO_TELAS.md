# Descrição Funcional das Telas do Projeto

Este documento detalha o propósito e as funcionalidades de cada tela principal da aplicação, segmentado por perfil de usuário.

---

## 1. Fluxo do Passageiro

O fluxo do passageiro foi projetado para ser intuitivo, permitindo solicitar uma corrida rapidamente.

### Tela Principal do Passageiro (`/passenger` e `/`)

-   **Componente Principal:** `PassengerDashboard`
-   **Propósito:** Esta é a tela central para o passageiro. Ela apresenta um layout dividido com o formulário de solicitação de corrida de um lado e um mapa interativo do outro.
-   **Funcionalidades:**
    -   **Formulário de Solicitação (`RideRequestForm`):**
        -   Campos para inserir o local de **Partida** e **Destino**.
        -   Botão para usar a geolocalização do navegador para preencher a partida.
        -   Uma opção (switch) para ativar o modo **"Interior/Intermunicipal"**. Se ativada, a lógica de negociação de tarifa é habilitada. Se desativada, o sistema busca por corridas com tarifa fixa.
        -   Botão para **"Pedir Corrida"** ou **"Ver Motoristas Próximos"**, que revela uma lista de motoristas disponíveis.
    -   **Mapa (`MapPlaceholder`):**
        -   Exibe a localização simulada do usuário no centro.
        -   Mostra ícones de carros para cada motorista online, com animações de radar para indicar a busca.
        -   Clicar em um motorista abre um pop-up com informações detalhadas (nome, veículo, avaliação) e a opção de "Chamar".
    -   **Autenticação (`PassengerAuthForm`):** Integrada através de um ícone no cabeçalho (`AppLayout`), permite que o passageiro faça login ou se registre para acessar seu histórico e perfil.

### Tela de Perfil e Histórico do Passageiro

-   **Componente Principal:** `PassengerAuthForm` (no modo logado)
-   **Propósito:** Após o login, esta interface permite ao passageiro gerenciar sua conta.
-   **Funcionalidades:**
    -   **Visualização de Perfil:** Mostra o avatar, nome e email do passageiro.
    -   **Edição de Foto:** Permite tirar ou carregar uma nova foto de perfil.
    -   **Histórico de Corridas (`RideHistory`):** Exibe uma lista de todas as viagens anteriores, com detalhes sobre o motorista, trajeto, valor e status. Permite ao passageiro avaliar corridas concluídas.
    -   **Histórico de Conversas (`ChatHistory`):** Mostra um arquivo das conversas com motoristas.
    -   **Alteração de Senha e Logout.**

---

## 2. Fluxo do Motorista

O motorista possui um painel de controle completo para gerenciar todas as suas atividades.

### Tela de Login do Motorista (`/driver/login`)

-   **Componente Principal:** `DriverLoginPage`
-   **Propósito:** Página de acesso exclusiva e segura para motoristas.
-   **Funcionalidades:**
    -   Formulário com campos para **Email** e **Senha**.
    -   Validação via `NextAuth` para garantir que apenas usuários com a `role` de `DRIVER` possam acessar.

### Painel Principal do Motorista (`/driver`)

-   **Componente Principal:** `DriverProfilePage`
-   **Propósito:** Uma interface centralizada com abas que organiza todas as ferramentas de trabalho do motorista.
-   **Funcionalidades:**
    -   **Cabeçalho do Perfil:** Exibe a foto, nome, avaliação e um seletor para alterar o status (`Online`, `Offline`, `Em Viagem`).
    -   **Aba "Solicitações" (`RideRequests`):**
        -   Mostra cartões de novas solicitações de corrida em tempo real.
        -   Permite **Aceitar** ou **Rejeitar** corridas de tarifa fixa.
        -   Para corridas a negociar, abre um **Chat de Negociação (`NegotiationChat`)**.
        -   Quando uma corrida está em andamento, a tela muda para mostrar o status da viagem atual, com opções de chat e finalização.
    -   **Aba "Conversas" (`DriverChatHistory`):** Arquivo de todas as conversas passadas com passageiros.
    -   **Aba "Histórico" (`DriverRideHistory`):**
        -   Tabela com todas as corridas realizadas.
        -   Opções para **exportar relatórios** financeiros em PDF e CSV.
        -   Funcionalidade para **registrar uma corrida manualmente** (para passageiros captados fora do app).
    -   **Aba "Perfil" (`ProfileForm`):**
        -   Permite ao motorista **editar suas informações pessoais** (nome, chave PIX).
        -   Gerenciar informações do **veículo** (modelo, placa).
        -   Fazer **upload de documentos** (CNH, CRLV) e fotos.
        -   **Configurar preferências de corrida**, como o valor da tarifa fixa ou por km.

---

## 3. Fluxo do Administrador

Uma área restrita para o gerenciamento total da plataforma.

### Painel do Administrador (`/admin`)

-   **Componente Principal:** `AdminDashboard`
-   **Propósito:** Visão geral das ferramentas de administração.
-   **Funcionalidades:**
    -   **Gerenciamento de Usuários (`UserManagementTable`):**
        -   Tabela completa com todos os usuários (passageiros, motoristas, admins).
        -   **Adicionar, remover e editar** usuários.
        -   **Ativar ou desativar** contas.
        -   **Alterar a senha** de qualquer usuário.
        -   **Gerar relatórios em PDF** de corridas para um motorista específico.
        -   **Visualizar o log de status** de um motorista (histórico de online/offline).
    -   **Ferramentas Adicionais (em um Acordeão):**
        -   **Verificação de Relatórios (`ReportVerification`):** Campo para inserir um ID de relatório e verificar sua autenticidade.
        -   **Configurações da Plataforma:** Opção para permitir ou bloquear corridas de passageiros anônimos.
        -   Link para o **Painel do Desenvolvedor**.

### Painel do Desenvolvedor (`/admin/developer`)

-   **Componente Principal:** `DeveloperPage`
-   **Propósito:** Uma tela técnica para monitoramento da saúde do sistema.
-   **Funcionalidades:**
    -   **Teste de Conexão com API:** Campo para inserir a URL da API e testar a conectividade.
    -   **Métricas de Desempenho (Simuladas):** Exibe cartões com tempo de resposta, taxa de erro, uso de CPU e memória.
    -   **Status da API (Simulado):** Lista de endpoints e seu status operacional.
    -   **Logs de Erro (Simulados):** Exibe os erros mais recentes para depuração.

---

## 4. Fluxo do Operador

Uma interface focada no suporte e monitoramento em tempo real.

### Painel de Operações (`/operator`)

-   **Componente Principal:** `OperatorDashboard`
-   **Propósito:** Dashboard para a equipe de suporte e operações.
-   **Funcionalidades:**
    -   **Métricas em Tempo Real (Simuladas):** Exibe o número de motoristas online, corridas em andamento e conversas ativas.
    -   **Ações Rápidas:**
        -   Botão para abrir o **Monitoramento da Frota (`FleetMonitor`)** em um modal, que mostra a lista e o mapa de motoristas.
        -   Botão que leva para a tela de **Conversas**.

### Tela de Conversas (`/operator/conversations`)

-   **Componente Principal:** `OperatorConversationsPage`
-   **Propósito:** Interface de chat para comunicação com motoristas e passageiros (estilo helpdesk).
-   **Funcionalidades:**
    -   **Lista de Conversas (`ConversationList`):** Painel à esquerda com a lista de todos os chats, mostrando nome, prévia da mensagem e contador de mensagens não lidas.
    -   **Janela de Chat (`ChatWindow`):** Área principal onde a conversa selecionada é exibida e o operador pode responder.

# MobiCeolin - Sistema de Mobilidade Urbana

Este é um protótipo de um sistema completo de mobilidade urbana, similar a aplicativos de transporte, construído com as mais modernas tecnologias de desenvolvimento web e inteligência artificial.

## Visão Geral

O MobiCeolin conecta passageiros a motoristas, oferecendo uma plataforma robusta e intuitiva para solicitação e gerenciamento de corridas. A aplicação possui três perfis de usuário principais: **Passageiro**, **Motorista** e **Administrador**, cada um com seu próprio painel e funcionalidades.

## Tecnologias Utilizadas

*   **Frontend:** Next.js (com App Router), React, TypeScript
*   **UI:** ShadCN UI, Tailwind CSS
*   **Inteligência Artificial:** Google Genkit
*   **Hospedagem:** Firebase App Hosting

## Funcionalidades Principais

### Para Passageiros
- **Solicitação de Corrida:** Interface simples para inserir locais de partida e destino.
- **Estimativa de Tarifa:** Cálculo automático do valor estimado para corridas urbanas.
- **Negociação com IA para Corridas Rurais:** Um sistema inovador onde o passageiro pode solicitar uma corrida para o interior e receber propostas de motoristas. Um fluxo de IA (Genkit) ajuda a mediar e sugerir um valor justo.
- **Visualização de Motoristas:** Veja motoristas disponíveis nas proximidades, com detalhes do perfil, veículo e avaliações.
- **Chat para Negociação:** Ferramenta de chat para combinar valores e detalhes diretamente com o motorista.
- **Autenticação Opcional:** O passageiro pode pedir uma corrida sem se cadastrar, mas tem a opção de criar uma conta para salvar seu histórico e informações.

### Para Motoristas
- **Painel de Controle:** Acesse um painel exclusivo após o login.
- **Gerenciamento de Perfil:** Atualize informações pessoais, do veículo, documentos e chave PIX.
- **Status de Disponibilidade:** Alterne facilmente entre os status "Online", "Offline" e "Em Viagem (Interior)".
- **Recebimento de Solicitações:** Aceite ou recuse corridas urbanas e propostas de negociação para corridas rurais.
- **Histórico de Viagens:** Visualize um registro de todas as corridas realizadas, com detalhes de trajeto e ganhos.

### Para Administradores
- **Painel de Gerenciamento:** Uma área restrita para administração da plataforma.
- **Gerenciamento de Usuários:** Adicione, remova, ative ou desative contas de passageiros e motoristas de forma manual.

## Como Começar

1.  **Clone o repositório.**
2.  **Instale as dependências:** `npm install`
3.  **Execute o servidor de desenvolvimento:** `npm run dev`
4.  A aplicação estará disponível em `http://localhost:9002`.

### Acessos de Demonstração

- **Administrador:**
  - **Email:** `admin@mobiceolin.com`
  - **Senha:** `admin123`

- **Motorista:**
  - **Email:** `carlos@email.com`
  - **Senha:** `123456`

- **Passageiro:**
  - Não é necessário login para solicitar uma corrida. A autenticação é opcional.

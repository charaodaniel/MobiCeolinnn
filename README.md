## CEOLIN Mobilidade urbana: Seu App de Transporte Inteligente

CEOLIN Mobilidade urbana é uma plataforma de transporte que conecta passageiros e motoristas de forma eficiente e inovadora, com foco especial em atender tanto demandas urbanas quanto rurais e intermunicipais.

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

1. **Clone o repositório.**
2. **Instale as dependências:** `npm install`
3. **Execute o servidor de desenvolvimento:** `npm run dev`
4. A aplicação estará disponível em `http://localhost:9002`.

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

- **PREINSTALL.md:** Informações importantes antes da instalação.
- **POSTINSTALL.md:** Passos a serem seguidos após a instalação.
- **CHANGELOG.md:** Histórico de mudanças da aplicação.

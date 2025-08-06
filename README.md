## CEOLIN Mobilidade Urbana: Seu App de Transporte Inteligente

CEOLIN Mobilidade Urbana é uma plataforma de transporte que conecta passageiros e motoristas de forma eficiente e inovadora, com foco especial em atender tanto demandas urbanas quanto rurais e intermunicipais.

Esta versão do projeto utiliza **Appwrite** como backend, uma solução de Backend-como-um-Serviço (BaaS) de código aberto que é leve, performática e ideal para auto-hospedagem (self-hosting), especialmente em VPS com recursos moderados.

## Funcionalidades Principais

As funcionalidades principais da aplicação permanecem as mesmas, com a lógica de negócio agora sendo gerenciada pelo Appwrite.

### Para Passageiros
- Solicitação de Corrida (Urbana e Rural/Intermunicipal)
- Negociação de Tarifa via IA (Genkit)
- Visualização de Motoristas e Chat
- Autenticação Opcional

### Para Motoristas
- Painel de Controle com Login
- Gerenciamento de Perfil, Veículo e Documentos
- Status de Disponibilidade
- Recebimento de Solicitações
- Histórico e Relatórios

### Para Administradores
- Painel de Gerenciamento Completo
- Gerenciamento de Usuários
- Relatórios e Auditoria

## Como Começar (Ambiente com Appwrite)

### 1. Configurando o Backend (Appwrite na VPS)

O Appwrite funciona com Docker, tornando a instalação simples e isolada.

1.  **Conecte-se à sua VPS via SSH.**
2.  **Execute o instalador oficial do Appwrite:**
    -   Certifique-se de que o Docker esteja instalado e atualizado em sua máquina.
    -   Execute o comando abaixo. Ele irá guiá-lo por um processo de configuração interativo.
        ```bash
        docker run -it --rm \
            --volume /var/run/docker.sock:/var/run/docker.sock \
            --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
            --entrypoint="install" \
            appwrite/appwrite:latest
        ```
    -   Siga as instruções no terminal para configurar a porta HTTP, o domínio e outras chaves secretas.

3.  **Acesse o Painel do Appwrite:**
    -   Após a instalação, abra seu navegador e acesse `http://SEU_IP_DA_VPS`.
    -   Crie sua conta de administrador.
    -   Crie um novo projeto. Anote o **Project ID**.
    -   Na seção "Platforms", adicione uma nova plataforma "Web", inserindo `localhost` para desenvolvimento e o IP da sua VPS para produção.
    -   Na seção "API Keys", gere uma nova chave de API com todos os escopos. Anote o **Secret**.

### 2. Configurando o Frontend (Interface do Usuário)

1.  **Clone o repositório (se ainda não o fez):**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DO_DIRETORIO>
    ```
2.  **Configure as Variáveis de Ambiente do Frontend:**
    -   Crie um arquivo chamado `.env.local` na raiz do projeto.
    -   Adicione as credenciais do seu projeto Appwrite. Estas chaves são seguras para serem expostas no frontend.
      ```env
      # Credenciais do Cliente Appwrite (Frontend)
      # Substitua com as informações do seu projeto
      NEXT_PUBLIC_APPWRITE_ENDPOINT=http://SEU_IP_DA_VPS/v1
      NEXT_PUBLIC_APPWRITE_PROJECT_ID=SEU_PROJECT_ID
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

- **Backend:** Appwrite (Docker, Node.js)
- **Frontend:** React, Next.js, TypeScript, Tailwind CSS
- **IA:** Genkit

## Próximos Passos

-   Configurar as coleções (Databases), buckets (Storage) e funções (Functions) no painel do Appwrite.
-   Conectar a interface do frontend com os serviços do Appwrite para realizar operações reais.
-   Implementar a lógica de negócio complexa usando as Appwrite Functions.

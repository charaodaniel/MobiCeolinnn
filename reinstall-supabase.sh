#!/bin/bash

# Este script automatiza a instalação completa do Docker e a configuração do Supabase self-hosted,
# incluindo a modificação do docker-compose.yml para expor a porta do banco de dados.
# ATENÇÃO: Ele removerá instalações anteriores do Docker e do Supabase no diretório /root/supabase.
# Execute com cautela.

# --- Configuração de Variáveis ---
# Use as mesmas credenciais do seu arquivo api/.env
SUPABASE_PASSWORD="02061994"
SUPABASE_JWT_SECRET="segredosupersegredoparajwt123!@#"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.M--toBPS5MPO9Ea-tf9NrJGOKi7D_GhpCoF1Gl5Knbg"
COMPOSE_FILE_PATH="/root/supabase/docker/docker-compose.yml"

set -e # Encerra o script se qualquer comando falhar

echo "### INICIANDO A REINSTALAÇÃO DO AMBIENTE DOCKER E SUPABASE ###"

# --- Etapa 1: Instalação do Docker ---
echo "-> 1/5 - Removendo versões antigas do Docker..."
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do
    sudo apt-get remove -y $pkg > /dev/null 2>&1 || true
done

echo "-> 2/5 - Instalando o Docker Engine e o Compose Plugin..."
sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "-> Docker instalado com sucesso!"

# --- Etapa 2: Configuração do Supabase ---
echo "-> 3/5 - Configurando o Supabase..."
# Remove o diretório antigo para garantir uma instalação limpa
if [ -d "/root/supabase" ]; then
    echo "    - Removendo instalação antiga do Supabase..."
    # Para o docker-compose antes de remover os arquivos
    if [ -f "$COMPOSE_FILE_PATH" ]; then
        cd /root/supabase/docker && docker compose down --volumes > /dev/null 2>&1 || true
    fi
    rm -rf /root/supabase
fi

# Clona o repositório
git clone --depth 1 https://github.com/supabase/supabase.git /root/supabase

# Navega para a pasta correta
cd /root/supabase/docker

echo "    - Criando arquivo de configuração .env do Supabase..."
# Copia o arquivo de exemplo para criar o .env
cp .env.example .env

# Atualiza o .env com as senhas e segredos definidos no início do script
sed -i "s/POSTGRES_PASSWORD=postgres/POSTGRES_PASSWORD=${SUPABASE_PASSWORD}/g" .env
sed -i "s/JWT_SECRET=super-secret-jwt-token-with-at-least-32-characters-long/JWT_SECRET=${SUPABASE_JWT_SECRET}/g" .env
sed -i "s/ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.*/ANON_KEY=${SUPABASE_ANON_KEY}/g" .env
sed -i "s/SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.*/SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}/g" .env

echo "-> 4/5 - Modificando docker-compose.yml para expor a porta do banco de dados..."
# Adiciona o mapeamento da porta 5432 ao serviço 'db'
# Este comando insere a seção 'ports' abaixo da linha 'image: supabase/postgres...'
# A verificação 'grep' evita adicionar a seção se ela já existir.
if ! grep -q "ports:" $COMPOSE_FILE_PATH; then
    sed -i "/image: supabase\/postgres.*/a \    ports:\n      - \"5432:5432\"" $COMPOSE_FILE_PATH
fi


echo "-> 5/5 - Configuração do Supabase concluída."

echo "### PROCESSO FINALIZADO COM SUCESSO! ###"
echo ""
echo "Próximos passos recomendados:"
echo "1. Execute o script de inicialização para subir o Supabase e a API:"
echo "   cd /root/api && ./start-project.sh"
echo "2. Verifique se a conexão com o banco de dados funciona:"
echo "   cd /root/api && node test-db-connection.js"
echo ""
echo "Lembre-se de garantir que seu arquivo 'api/.env' esteja usando DB_PORT=5432 e DB_HOST=127.0.0.1 ou localhost."

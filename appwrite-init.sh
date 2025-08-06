#!/bin/bash

# Este script automatiza a instalação do Docker e a configuração inicial do Appwrite.
# Execute com cautela.

set -e # Encerra o script se qualquer comando falhar

echo "### INICIANDO A CONFIGURAÇÃO DO AMBIENTE DOCKER E APPWRITE ###"

# --- Etapa 1: Instalação do Docker ---
if ! command -v docker &> /dev/null
then
    echo "-> 1/3 - Docker não encontrado. Instalando..."
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
else
    echo "-> 1/3 - Docker já está instalado. Pulando etapa."
fi


# --- Etapa 2: Configuração do Appwrite ---
echo "-> 2/3 - Configurando o Appwrite..."

# Cria o diretório se não existir
mkdir -p /root/appwrite
cd /root/appwrite

echo "-> 3/3 - Baixando o arquivo docker-compose.yml do Appwrite..."

# Baixa o docker-compose.yml e o .env do Appwrite
curl -fsSL https://appwrite.io/docker-compose.yml -o docker-compose.yml
curl -fsSL https://appwrite.io/.env -o .env

echo "### PROCESSO FINALIZADO COM SUCESSO! ###"
echo ""
echo "Próximos passos recomendados:"
echo "1. Inicie o Appwrite com o comando:"
echo "   cd /root/appwrite && docker compose up -d"
echo ""
echo "2. Acesse o painel do Appwrite no seu navegador:"
echo "   http://SEU_IP_DA_VPS"
echo ""
echo "3. Crie sua conta de administrador e um novo projeto."
echo "4. Configure as variáveis de ambiente no arquivo .env.local do seu frontend com o Endpoint e o Project ID."


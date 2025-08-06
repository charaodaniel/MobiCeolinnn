#!/bin/bash

# Este script automatiza a instalação do Docker e a configuração inicial do Appwrite,
# copiando os arquivos de configuração locais para o diretório de instalação.
# Execute com cautela.

set -e # Encerra o script se qualquer comando falhar

echo "### INICIANDO A CONFIGURAÇÃO DO AMBIENTE DOCKER E APPWRITE ###"

# --- Etapa 1: Instalação do Docker ---
if ! command -v docker &> /dev/null
then
    echo "-> 1/4 - Docker não encontrado. Instalando..."
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
    echo "-> 1/4 - Docker já está instalado. Pulando etapa."
fi


# --- Etapa 2: Configuração do Appwrite ---
echo "-> 2/4 - Configurando o diretório do Appwrite..."

# Cria o diretório se não existir
mkdir -p /root/appwrite
cd /root/appwrite

echo "-> 3/4 - Copiando arquivos de configuração do Appwrite..."

# Copia os arquivos locais para o diretório do Appwrite
# ATENÇÃO: Execute este script a partir do diretório raiz do seu projeto clonado,
# para que ele possa encontrar a pasta 'appwrite/'.
cp ../appwrite/docker-compose.yml .
cp ../appwrite/.env .

echo "-> 4/4 - Definindo credenciais e variáveis de ambiente no arquivo .env..."

# Use `sed` para substituir os valores padrão no arquivo .env.
# Isso garante que as credenciais sejam previsíveis.
# Nota: Em um ambiente de produção real, use senhas mais fortes e gerencie-as com segurança.
sed -i "s/_APP_ENV=development/_APP_ENV=production/g" .env
sed -i "s/_APP_OPENSSL_KEY_V1=.../_APP_OPENSSL_KEY_V1=your-super-secret-and-long-openssl-key/g" .env
sed -i "s/_APP_DB_HOST=mariadb/_APP_DB_HOST=mariadb/g" .env
sed -i "s/_APP_DB_PORT=3306/_APP_DB_PORT=3306/g" .env
sed -i "s/_APP_DB_USER=user/_APP_DB_USER=adminceolin/g" .env
sed -i "s/_APP_DB_PASS=password/_APP_DB_PASS=SenhaForteParaOBanco123!@#/g" .env


echo "### PROCESSO FINALIZADO COM SUCESSO! ###"
echo ""
echo "O arquivo .env foi configurado com credenciais explícitas."
echo "Próximos passos recomendados:"
echo "1. Inicie o Appwrite com o comando:"
echo "   cd /root/appwrite && docker compose up -d"
echo ""
echo "2. Acesse o painel do Appwrite no seu navegador:"
echo "   http://SEU_IP_DA_VPS"
echo ""
echo "3. Crie sua conta de administrador e um novo projeto."
echo "4. Configure as variáveis de ambiente no arquivo .env.local do seu frontend com o Endpoint e o Project ID."

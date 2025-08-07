#!/bin/bash

# Este script RECONFIGURA uma instalação existente do Appwrite.
# Ele NÃO instala o Appwrite. Execute-o somente APÓS usar o instalador oficial.
# O objetivo é definir variáveis de ambiente para valores conhecidos,
# facilitando a conexão entre o frontend e o backend.

set -e # Encerra o script se qualquer comando falhar

# O instalador oficial do Appwrite por padrão cria a pasta 'appwrite' no diretório atual.
# Vamos assumir que foi executado de /root/ para encontrar o .env.
ENV_FILE="/root/appwrite/.env"
IP_ADDRESS=$(curl -s ifconfig.me)

# Verifica se o arquivo .env do Appwrite existe
if [ ! -f "$ENV_FILE" ]; then
    echo "ERRO: O arquivo de configuração do Appwrite ($ENV_FILE) não foi encontrado."
    echo "Certifique-se de que você já instalou o Appwrite em /root/appwrite."
    exit 1
fi

echo "### INICIANDO A RECONFIGURAÇÃO DO APPWRITE ###"

echo "-> 1/3 - Definindo variáveis de ambiente no arquivo $ENV_FILE..."

# Substitui as configurações padrão pelas nossas configurações explícitas.
# Usamos o caractere | como delimitador no sed para evitar conflitos com / em URLs.
# Nota: Em um ambiente de produção real, use senhas mais fortes e gerencie-as com segurança.

# Força o modo de produção
sed -i "s/_APP_ENV=.*/_APP_ENV=production/g" "$ENV_FILE"

# **NOVO**: Define o domínio como o IP da VPS para corrigir o erro 404
echo "Configurando o domínio para o IP: $IP_ADDRESS"
sed -i "s/_APP_DOMAIN=.*/_APP_DOMAIN=$IP_ADDRESS/g" "$ENV_FILE"
sed -i "s/_APP_DOMAIN_TARGET=.*/_APP_DOMAIN_TARGET=$IP_ADDRESS/g" "$ENV_FILE"


# Define um usuário e senha conhecidos para o banco de dados (se necessário)
sed -i "s/_APP_DB_USER=.*/_APP_DB_USER=adminceolin/g" "$ENV_FILE"
sed -i "s/_APP_DB_PASS=.*/_APP_DB_PASS=SenhaForteParaOBanco123!@#/g" "$ENV_FILE"

echo "-> 2/3 - Arquivo .env atualizado com sucesso."
echo "-> 3/3 - As credenciais e o domínio foram definidos para valores conhecidos."

echo ""
echo "### PROCESSO FINALIZADO ###"
echo ""
echo "IMPORTANTE: Para que as novas configurações tenham efeito, você PRECISA reiniciar o Appwrite."
echo "Execute os seguintes comandos:"
echo ""
echo "1. Navegue até o diretório do Appwrite:"
echo "   cd /root/appwrite"
echo ""
echo "2. Reinicie os contêineres para aplicar as novas variáveis de ambiente:"
echo "   sudo docker compose up -d --force-recreate"
echo ""
echo "Após a reinicialização (aguarde cerca de um minuto), seu painel Appwrite estará acessível em http://$IP_ADDRESS"

#!/bin/bash

# Script para iniciar todos os serviços do projeto CEOLIN Mobilidade Urbana

echo "-> 1/3 - Iniciando serviços do Supabase..."

# Navega até o diretório do Docker Compose do Supabase
cd /root/supabase/docker || { echo "Erro: Diretório do Supabase não encontrado."; exit 1; }

# Inicia os contêineres do Supabase em segundo plano
docker compose up -d

# Verifica se o docker compose foi bem-sucedido
if [ $? -ne 0 ]; then
    echo "Erro: Falha ao iniciar os contêineres do Supabase."
    exit 1
fi

echo "-> Supabase iniciado com sucesso."
echo "-> 2/3 - Aguardando o banco de dados ficar pronto (15 segundos)..."

# Aguarda 15 segundos para dar tempo para o banco de dados iniciar completamente
sleep 15

echo "-> 3/3 - Iniciando a API..."

# Navega de volta para o diretório da API
cd /root/api || { echo "Erro: Diretório da API não encontrado."; exit 1; }

# Compila o TypeScript para JavaScript (necessário para produção com pm2)
npm run build

# Inicia a API com pm2 (ou reinicia se já estiver rodando)
# O --name permite gerenciar o processo facilmente (ex: pm2 stop ceolin-api)
pm2 start dist/app.js --name "ceolin-api" --update-env

echo "-> Processo de inicialização concluído!"
echo "-> Use 'pm2 list' para ver o status da API."
echo "-> Use 'pm2 logs ceolin-api' para ver os logs em tempo real."

#!/bin/bash

# Este script automatiza a instalação do Docker e a configuração inicial do Appwrite,
# criando os arquivos de configuração diretamente para garantir a autonomia.
# Execute com cautela.

set -e # Encerra o script se qualquer comando falhar

APPWRITE_DIR="/root/appwrite"

echo "### INICIANDO A CONFIGURAÇÃO DO AMBIENTE DOCKER E APPWRITE ###"

# --- Etapa 1: Instalação do Docker ---
if ! command -v docker &> /dev/null
then
    echo "-> 1/5 - Docker não encontrado. Instalando..."
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
    echo "-> 1/5 - Docker já está instalado. Pulando etapa."
fi


# --- Etapa 2: Configuração do Diretório Appwrite ---
echo "-> 2/5 - Configurando o diretório do Appwrite em ${APPWRITE_DIR}..."

# Cria o diretório se não existir
mkdir -p ${APPWRITE_DIR}
cd ${APPWRITE_DIR}

# --- Etapa 3: Criação do docker-compose.yml ---
echo "-> 3/5 - Criando o arquivo docker-compose.yml..."

cat > docker-compose.yml << EOF
services:
  appwrite:
    image: appwrite/appwrite:1.5.7
    container_name: appwrite
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - appwrite-uploads:/storage/uploads:rw
      - appwrite-cache:/storage/cache:rw
      - appwrite-config:/storage/config:rw
      - appwrite-certificates:/storage/certificates:rw
      - appwrite-functions:/storage/functions:rw
      - /var/run/docker.sock:/var/run/docker.sock:ro
    depends_on:
      - mariadb
      - redis
    environment:
      - _APP_ENV
      - _APP_LOCALE
      - _APP_CONSOLE_WHITELIST_EMAILS
      - _APP_CONSOLE_WHITELIST_IPS
      - _APP_SYSTEM_SECURITY_EMAIL_ADDRESS
      - _APP_DB_HOST
      - _APP_DB_PORT
      - _APP_DB_SCHEMA
      - _APP_DB_USER
      - _APP_DB_PASS
      - _APP_REDIS_HOST
      - _APP_REDIS_PORT
      - _APP_REDIS_USER
      - _APP_REDIS_PASS
      - _APP_QUEUE_STATS_TIME_LIMIT
      - _APP_QUEUE_FUNCTIONS_TIME_LIMIT
      - _APP_QUEUE_BUILDS_TIME_LIMIT
      - _APP_QUEUE_MIGRATIONS_TIME_LIMIT
      - _APP_QUEUE_STATS_SIZE
      - _APP_QUEUE_FUNCTIONS_SIZE
      - _APP_QUEUE_LOGS_SIZE
      - _APP_QUEUE_USAGE_SIZE
      - _APP_QUEUE_USAGE_DUMP_SIZE
      - _APP_QUEUE_WEBHOOKS_SIZE
      - _APP_QUEUE_CERTIFICATES_SIZE
      - _APP_QUEUE_BUILDS_SIZE
      - _APP_QUEUE_MESSAGING_SIZE
      - _APP_QUEUE_MAILS_SIZE
      - _APP_QUEUE_MIGRATIONS_SIZE
      - _APP_EXECUTOR_SECRET
      - _APP_EXECUTOR_RUNTIME_NETWORK
      - _APP_EXECUTOR_LOGS_PRUNE
      - _APP_EXECUTOR_PULL_TIMEOUT
      - _APP_WORKER_PER_CORE
      - _APP_OPENSANS_PRIVATE_KEY
      - _APP_OPENSANS_PUBLIC_KEY
      - _APP_OPENSSL_KEY_V1
      - _APP_STORAGE_LIMIT
      - _APP_STORAGE_PREVIEW_LIMIT
      - _APP_STORAGE_ANTIVIRUS
      - _APP_STORAGE_ANTIVIRUS_HOST
      - _APP_STORAGE_ANTIVIRUS_PORT
      - _APP_STORAGE_ENCRYPTION
      - _APP_STORAGE_DEVICE
      - _APP_STORAGE_S3_ACCESS_KEY
      - _APP_STORAGE_S3_SECRET
      - _APP_STORAGE_S3_REGION
      - _APP_STORAGE_S3_BUCKET
      - _APP_STORAGE_S3_ENDPOINT
      - _APP_STORAGE_S3_PATH
      - _APP_STORAGE_DO_SPACES_ACCESS_KEY
      - _APP_STORAGE_DO_SPACES_SECRET
      - _APP_STORAGE_DO_SPACES_REGION
      - _APP_STORAGE_DO_SPACES_BUCKET
      - _APP_STORAGE_DO_SPACES_PATH
      - _APP_STORAGE_BACKBLAZE_ACCESS_KEY
      - _APP_STORAGE_BACKBLAZE_SECRET
      - _APP_STORAGE_BACKBLAZE_REGION
      - _APP_STORAGE_BACKBLAZE_BUCKET
      - _APP_STORAGE_BACKBLAZE_PATH
      - _APP_STORAGE_LINODE_ACCESS_KEY
      - _APP_STORAGE_LINODE_SECRET
      - _APP_STORAGE_LINODE_REGION
      - _APP_STORAGE_LINODE_BUCKET
      - _APP_STORAGE_LINODE_PATH
      - _APP_STORAGE_WASABI_ACCESS_KEY
      - _APP_STORAGE_WASABI_SECRET
      - _APP_STORAGE_WASABI_REGION
      - _APP_STORAGE_WASABI_BUCKET
      - _APP_STORAGE_WASABI_PATH
      - _APP_DOMAIN
      - _APP_DOMAIN_TARGET
      - _APP_DOMAIN_FUNCTIONS
      - _APP_SMTP_HOST
      - _APP_SMTP_PORT
      - _APP_SMTP_SECURE
      - _APP_SMTP_USERNAME
      - _APP_SMTP_PASSWORD
      - _APP_SMTP_SENDER_NAME
      - _APP_SMTP_SENDER_EMAIL
      - _APP_SMTP_REPLY_TO
      - _APP_SMS_PROVIDER
      - _APP_SMS_FROM
      - _APP_TWILIO_ACCOUNT_SID
      - _APP_TWILIO_AUTH_TOKEN
      - _APP_TEXTMAGIC_USERNAME
      - _APP_TEXTMAGIC_API_KEY
      - _APP_TELESIGN_USER
      - _APP_TELESIGN_PASS
      - _APP_MSG91_SENDER_ID
      - _APP_MSG91_AUTH_KEY
      - _APP_VONAGE_API_KEY
      - _APP_VONAGE_API_SECRET
      - _APP_PHONE_AUTHY_API_KEY
      - _APP_PHONE_VERIFICATION
      - _APP_LOGGING_PROVIDER
      - _APP_LOGGING_CONFIG
      - _APP_USAGE_STATS
      - _APP_USAGE_AGGREGATION_INTERVAL
      - _APP_VCS_GITHUB_APP_NAME
      - _APP_VCS_GITHUB_APP_ID
      - _APP_VCS_GITHUB_PRIVATE_KEY
      - _APP_VCS_GITHUB_WEBHOOK_SECRET
      - _APP_MAINTENANCE_INTERVAL
      - _APP_MAINTENANCE_RETENTION_CACHE
      - _APP_MAINTENANCE_RETENTION_EXECUTION
      - _APP_MAINTENANCE_RETENTION_ABUSE
      - _APP_MAINTENANCE_RETENTION_AUDIT
      - _APP_GRAPHQL_MAX_BATCH_SIZE
      - _APP_GRAPHQL_MAX_COMPLEXITY
      - _APP_GRAPHQL_MAX_DEPTH
      - _APP_OPTIONS_ABUSE
      - _APP_OPTIONS_AUDIT
      - _APP_OPTIONS_FORCE_HTTPS
      - _APP_OPTIONS_ROUTER_PROTECTION
      - _APP_ASSISTANT_OPENAI_API_KEY
    networks:
      - appwrite
  
  appwrite-realtime:
    image: appwrite/appwrite-realtime:2.1.2
    container_name: appwrite-realtime
    restart: unless-stopped
    ports: []
    depends_on:
      - appwrite
    environment:
      - _APP_ENV
      - _APP_SYSTEM_SECURITY_EMAIL_ADDRESS
      - _APP_REDIS_HOST
      - _APP_REDIS_PORT
      - _APP_REDIS_USER
      - _APP_REDIS_PASS
      - _APP_METRICS_AGGREGATION_INTERVAL
      - _APP_CONNECTIONS_MAX
      - _APP_CONNECTIONS_SEC_MAX
      - _APP_CONNECTIONS_IP_MAX
    networks:
      - appwrite

  appwrite-worker-functions:
    image: appwrite/appwrite-worker-functions:3.1.2
    container_name: appwrite-worker-functions
    restart: unless-stopped
    depends_on:
      - appwrite-realtime
    environment:
      - _APP_ENV
      - _APP_OPENSSL_KEY_V1
      - _APP_EXECUTOR_SECRET
      - _APP_EXECUTOR_RUNTIME_NETWORK
      - _APP_STORAGE_DEVICE
      - _APP_STORAGE_S3_ACCESS_KEY
      - _APP_STORAGE_S3_SECRET
      - _APP_STORAGE_S3_REGION
      - _APP_STORAGE_S3_BUCKET
      - _APP_STORAGE_S3_ENDPOINT
      - _APP_STORAGE_S3_PATH
      - _APP_STORAGE_DO_SPACES_ACCESS_KEY
      - _APP_STORAGE_DO_SPACES_SECRET
      - _APP_STORAGE_DO_SPACES_REGION
      - _APP_STORAGE_DO_SPACES_BUCKET
      - _APP_STORAGE_DO_SPACES_PATH
      - _APP_STORAGE_BACKBLAZE_ACCESS_KEY
      - _APP_STORAGE_BACKBLAZE_SECRET
      - _APP_STORAGE_BACKBLAZE_REGION
      - _APP_STORAGE_BACKBLAZE_BUCKET
      - _APP_STORAGE_BACKBLAZE_PATH
      - _APP_STORAGE_LINODE_ACCESS_KEY
      - _APP_STORAGE_LINODE_SECRET
      - _APP_STORAGE_LINODE_REGION
      - _APP_STORAGE_LINODE_BUCKET
      - _APP_STORAGE_LINODE_PATH
      - _APP_STORAGE_WASABI_ACCESS_KEY
      - _APP_STORAGE_WASABI_SECRET
      - _APP_STORAGE_WASABI_REGION
      - _APP_STORAGE_WASABI_BUCKET
      - _APP_STORAGE_WASABI_PATH
      - _APP_USAGE_STATS
      - _APP_VCS_GITHUB_APP_NAME
      - _APP_VCS_GITHUB_APP_ID
      - _APP_VCS_GITHUB_PRIVATE_KEY
      - _APP_VCS_GITHUB_WEBHOOK_SECRET
      - _APP_FUNCTIONS_SIZE_LIMIT
      - _APP_FUNCTIONS_TIMEOUT
      - _APP_FUNCTIONS_BUILD_TIMEOUT
      - _APP_FUNCTIONS_INACTIVE_THRESHOLD
      - _APP_WORKER_PER_CORE
    volumes:
      - appwrite-functions:/storage/functions:rw
      - /var/run/docker.sock:/var/run/docker.sock:ro
    networks:
      - appwrite

  appwrite-worker-builds:
    image: appwrite/appwrite-worker-builds:2.1.2
    container_name: appwrite-worker-builds
    restart: unless-stopped
    depends_on:
      - appwrite-worker-functions
    environment:
      - _APP_ENV
      - _APP_OPENSSL_KEY_V1
      - _APP_EXECUTOR_SECRET
      - _APP_EXECUTOR_RUNTIME_NETWORK
      - _APP_STORAGE_DEVICE
      - _APP_STORAGE_S3_ACCESS_KEY
      - _APP_STORAGE_S3_SECRET
      - _APP_STORAGE_S3_REGION
      - _APP_STORAGE_S3_BUCKET
      - _APP_STORAGE_S3_ENDPOINT
      - _APP_STORAGE_S3_PATH
      - _APP_STORAGE_DO_SPACES_ACCESS_KEY
      - _APP_STORAGE_DO_SPACES_SECRET
      - _APP_STORAGE_DO_SPACES_REGION
      - _APP_STORAGE_DO_SPACES_BUCKET
      - _APP_STORAGE_DO_SPACES_PATH
      - _APP_STORAGE_BACKBLAZE_ACCESS_KEY
      - _APP_STORAGE_BACKBLAZE_SECRET
      - _APP_STORAGE_BACKBLAZE_REGION
      - _APP_STORAGE_BACKBLAZE_BUCKET
      - _APP_STORAGE_BACKBLAZE_PATH
      - _APP_STORAGE_LINODE_ACCESS_KEY
      - _APP_STORAGE_LINODE_SECRET
      - _APP_STORAGE_LINODE_REGION
      - _APP_STORAGE_LINODE_BUCKET
      - _APP_STORAGE_LINODE_PATH
      - _APP_STORAGE_WASABI_ACCESS_KEY
      - _APP_STORAGE_WASABI_SECRET
      - _APP_STORAGE_WASABI_REGION
      - _APP_STORAGE_WASABI_BUCKET
      - _APP_STORAGE_WASABI_PATH
      - _APP_USAGE_STATS
      - _APP_WORKER_PER_CORE
    volumes:
      - appwrite-functions:/storage/functions:rw
      - /var/run/docker.sock:/var/run/docker.sock:ro
    networks:
      - appwrite

  appwrite-worker-certificates:
    image: appwrite/appwrite-worker-certificates:2.1.2
    container_name: appwrite-worker-certificates
    restart: unless-stopped
    depends_on:
      - appwrite-worker-builds
    environment:
      - _APP_ENV
      - _APP_OPENSSL_KEY_V1
      - _APP_DOMAIN
      - _APP_DOMAIN_TARGET
      - _APP_USAGE_STATS
      - _APP_WORKER_PER_CORE
    volumes:
      - appwrite-certificates:/storage/certificates:rw
      - appwrite-config:/storage/config:rw
    networks:
      - appwrite

  appwrite-worker-audits:
    image: appwrite/appwrite-worker-audits:2.1.2
    container_name: appwrite-worker-audits
    restart: unless-stopped
    depends_on:
      - appwrite-worker-certificates
    environment:
      - _APP_ENV
      - _APP_OPENSSL_KEY_V1
      - _APP_USAGE_STATS
      - _APP_WORKER_PER_CORE
    networks:
      - appwrite
      
  appwrite-worker-usage:
    image: appwrite/appwrite-worker-usage:2.1.2
    container_name: appwrite-worker-usage
    restart: unless-stopped
    depends_on:
      - appwrite-worker-audits
    environment:
      - _APP_ENV
      - _APP_OPENSSL_KEY_V1
      - _APP_USAGE_STATS
      - _APP_WORKER_PER_CORE
    networks:
      - appwrite
      
  appwrite-worker-usage-dump:
    image: appwrite/appwrite-worker-usage-dump:1.1.2
    container_name: appwrite-worker-usage-dump
    restart: unless-stopped
    depends_on:
      - appwrite-worker-usage
    environment:
      - _APP_ENV
      - _APP_OPENSSL_KEY_V1
      - _APP_USAGE_STATS
      - _APP_WORKER_PER_CORE
    networks:
      - appwrite

  appwrite-worker-webhooks:
    image: appwrite/appwrite-worker-webhooks:2.1.2
    container_name: appwrite-worker-webhooks
    restart: unless-stopped
    depends_on:
      - appwrite-worker-usage-dump
    environment:
      - _APP_ENV
      - _APP_OPENSSL_KEY_V1
      - _APP_USAGE_STATS
      - _APP_WORKER_PER_CORE
    networks:
      - appwrite

  appwrite-worker-mails:
    image: appwrite/appwrite-worker-mails:2.1.2
    container_name: appwrite-worker-mails
    restart: unless-stopped
    depends_on:
      - appwrite-worker-webhooks
    environment:
      - _APP_ENV
      - _APP_OPENSSL_KEY_V1
      - _APP_USAGE_STATS
      - _APP_WORKER_PER_CORE
    networks:
      - appwrite

  appwrite-worker-messaging:
    image: appwrite/appwrite-worker-messaging:1.1.2
    container_name: appwrite-worker-messaging
    restart: unless-stopped
    depends_on:
      - appwrite-worker-mails
    environment:
      - _APP_ENV
      - _APP_OPENSSL_KEY_V1
      - _APP_USAGE_STATS
      - _APP_WORKER_PER_CORE
    networks:
      - appwrite

  appwrite-worker-deletes:
    image: appwrite/appwrite-worker-deletes:2.1.2
    container_name: appwrite-worker-deletes
    restart: unless-stopped
    depends_on:
      - appwrite-worker-messaging
    environment:
      - _APP_ENV
      - _APP_OPENSSL_KEY_V1
      - _APP_USAGE_STATS
      - _APP_WORKER_PER_CORE
    volumes:
      - appwrite-uploads:/storage/uploads:rw
      - appwrite-functions:/storage/functions:rw
    networks:
      - appwrite

  appwrite-worker-migrations:
    image: appwrite/appwrite-worker-migrations:1.1.2
    container_name: appwrite-worker-migrations
    restart: unless-stopped
    depends_on:
      - appwrite-worker-deletes
    environment:
      - _APP_ENV
      - _APP_OPENSSL_KEY_V1
      - _APP_USAGE_STATS
      - _APP_WORKER_PER_CORE
    networks:
      - appwrite
      
  appwrite-maintenance:
    image: appwrite/appwrite-maintenance:1.1.2
    container_name: appwrite-maintenance
    restart: unless-stopped
    depends_on:
      - appwrite-worker-migrations
    environment:
      - _APP_ENV
      - _APP_OPENSSL_KEY_V1
      - _APP_MAINTENANCE_INTERVAL
      - _APP_MAINTENANCE_RETENTION_CACHE
      - _APP_MAINTENANCE_RETENTION_EXECUTION
      - _APP_MAINTENANCE_RETENTION_ABUSE
      - _APP_MAINTENANCE_RETENTION_AUDIT
      - _APP_USAGE_STATS
    volumes:
      - appwrite-uploads:/storage/uploads:rw
      - appwrite-cache:/storage/cache:rw
      - appwrite-functions:/storage/functions:rw
    networks:
      - appwrite

  mariadb:
    image: mariadb:10.11
    container_name: appwrite-mariadb
    restart: unless-stopped
    environment:
      - MARIADB_ROOT_PASSWORD=\${_APP_DB_ROOT_PASSWORD}
      - MARIADB_DATABASE=\${_APP_DB_SCHEMA}
      - MARIADB_USER=\${_APP_DB_USER}
      - MARIADB_PASSWORD=\${_APP_DB_PASS}
    volumes:
      - appwrite-mariadb:/var/lib/mysql:rw
    networks:
      - appwrite
    healthcheck:
      test: "mysqladmin ping -u root --password=\${_APP_DB_ROOT_PASSWORD}"
      interval: 5s
      timeout: 10s
      retries: 10

  redis:
    image: redis:7.2-alpine
    container_name: appwrite-redis
    restart: unless-stopped
    volumes:
      - appwrite-redis:/data:rw
    networks:
      - appwrite
    healthcheck:
      test: "redis-cli ping"
      interval: 5s
      timeout: 10s
      retries: 10

  influxdb:
    image: influxdb:1.8.10
    container_name: appwrite-influxdb
    restart: unless-stopped
    volumes:
      - appwrite-influxdb:/var/lib/influxdb
    networks:
      - appwrite
    healthcheck:
      test: "curl -sI http://localhost:8086/ping"
      interval: 5s
      timeout: 10s
      retries: 10

  telegraf:
    image: telegraf:1.28
    container_name: appwrite-telegraf
    restart: unless-stopped
    depends_on:
      - influxdb
    volumes:
      - ./appwrite/telegraf/telegraf.conf:/etc/telegraf/telegraf.conf:ro
    networks:
      - appwrite

  openruntimes-executor:
    image: appwrite/open-runtimes:3.0.0
    container_name: openruntimes-executor
    restart: unless-stopped
    expose:
      - "3000"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - appwrite-functions:/storage/functions:rw
      - openruntimes-cache:/storage/cache:rw
    environment:
      - _APP_EXECUTOR_SECRET
      - _APP_EXECUTOR_RUNTIMES
      - _APP_EXECUTOR_RUNTIME_NETWORK
      - _APP_EXECUTOR_HOST
      - _APP_EXECUTOR_PULL_TIMEOUT
      - _APP_EXECUTOR_LOGS_PRUNE
    networks:
      - appwrite

volumes:
  appwrite-mariadb:
  appwrite-redis:
  appwrite-cache:
  appwrite-uploads:
  appwrite-config:
  appwrite-certificates:
  appwrite-functions:
  appwrite-influxdb:
  openruntimes-cache:

networks:
  appwrite:
    driver: bridge
    name: appwrite
    external: false
EOF

# --- Etapa 4: Criação do .env ---
echo "-> 4/5 - Criando o arquivo .env..."

# Gera uma senha aleatória para o root do MariaDB
# Isto é mais seguro do que ter uma senha fixa.
DB_ROOT_PASSWORD=$(openssl rand -hex 16)

cat > .env << EOF
_APP_ENV=production
_APP_LOCALE=pt-BR
_APP_CONSOLE_WHITELIST_EMAILS=
_APP_CONSOLE_WHITELIST_IPS=
_APP_SYSTEM_SECURITY_EMAIL_ADDRESS=
_APP_DB_HOST=mariadb
_APP_DB_PORT=3306
_APP_DB_SCHEMA=appwrite
_APP_DB_USER=adminceolin
_APP_DB_PASS=SenhaForteParaOBanco123!@#
_APP_DB_ROOT_PASSWORD=${DB_ROOT_PASSWORD}
_APP_REDIS_HOST=redis
_APP_REDIS_PORT=6379
_APP_REDIS_USER=
_APP_REDIS_PASS=
_APP_QUEUE_STATS_TIME_LIMIT=900
_APP_QUEUE_FUNCTIONS_TIME_LIMIT=900
_APP_QUEUE_BUILDS_TIME_LIMIT=900
_APP_QUEUE_MIGRATIONS_TIME_LIMIT=900
_APP_QUEUE_STATS_SIZE=50000
_APP_QUEUE_FUNCTIONS_SIZE=50000
_APP_QUEUE_LOGS_SIZE=50000
_APP_QUEUE_USAGE_SIZE=50000
_APP_QUEUE_USAGE_DUMP_SIZE=10000
_APP_QUEUE_WEBHOOKS_SIZE=50000
_APP_QUEUE_CERTIFICATES_SIZE=50000
_APP_QUEUE_BUILDS_SIZE=50000
_APP_QUEUE_MESSAGING_SIZE=50000
_APP_QUEUE_MAILS_SIZE=50000
_APP_QUEUE_MIGRATIONS_SIZE=50000
_APP_EXECUTOR_SECRET=$(openssl rand -hex 16)
_APP_EXECUTOR_RUNTIME_NETWORK=appwrite_runtimes
_APP_EXECUTOR_LOGS_PRUNE=true
_APP_EXECUTOR_PULL_TIMEOUT=600
_APP_WORKER_PER_CORE=6
_APP_OPENSANS_PRIVATE_KEY=
_APP_OPENSANS_PUBLIC_KEY=
_APP_OPENSSL_KEY_V1=$(openssl rand -hex 32)
_APP_STORAGE_LIMIT=5000000000
_APP_STORAGE_PREVIEW_LIMIT=20000000
_APP_STORAGE_ANTIVIRUS=disabled
_APP_STORAGE_ANTIVIRUS_HOST=clamav
_APP_STORAGE_ANTIVIRUS_PORT=3310
_APP_STORAGE_ENCRYPTION=enabled
_APP_STORAGE_DEVICE=local
_APP_STORAGE_S3_ACCESS_KEY=
_APP_STORAGE_S3_SECRET=
_APP_STORAGE_S3_REGION=
_APP_STORAGE_S3_BUCKET=
_APP_STORAGE_S3_ENDPOINT=
_APP_STORAGE_S3_PATH=
_APP_STORAGE_DO_SPACES_ACCESS_KEY=
_APP_STORAGE_DO_SPACES_SECRET=
_APP_STORAGE_DO_SPACES_REGION=
_APP_STORAGE_DO_SPACES_BUCKET=
_APP_STORAGE_DO_SPACES_PATH=
_APP_STORAGE_BACKBLAZE_ACCESS_KEY=
_APP_STORAGE_BACKBLAZE_SECRET=
_APP_STORAGE_BACKBLAZE_REGION=
_APP_STORAGE_BACKBLAZE_BUCKET=
_APP_STORAGE_BACKBLAZE_PATH=
_APP_STORAGE_LINODE_ACCESS_KEY=
_APP_STORAGE_LINODE_SECRET=
_APP_STORAGE_LINODE_REGION=
_APP_STORAGE_LINODE_BUCKET=
_APP_STORAGE_LINODE_PATH=
_APP_STORAGE_WASABI_ACCESS_KEY=
_APP_STORAGE_WASABI_SECRET=
_APP_STORAGE_WASABI_REGION=
_APP_STORAGE_WASABI_BUCKET=
_APP_STORAGE_WASABI_PATH=
_APP_DOMAIN=localhost
_APP_DOMAIN_TARGET=localhost
_APP_DOMAIN_FUNCTIONS=
_APP_SMTP_HOST=
_APP_SMTP_PORT=
_APP_SMTP_SECURE=
_APP_SMTP_USERNAME=
_APP_SMTP_PASSWORD=
_APP_SMTP_SENDER_NAME=
_APP_SMTP_SENDER_EMAIL=
_APP_SMTP_REPLY_TO=
_APP_SMS_PROVIDER=
_APP_SMS_FROM=
_APP_TWILIO_ACCOUNT_SID=
_APP_TWILIO_AUTH_TOKEN=
_APP_TEXTMAGIC_USERNAME=
_APP_TEXTMAGIC_API_KEY=
_APP_TELESIGN_USER=
_APP_TELESIGN_PASS=
_APP_MSG91_SENDER_ID=
_APP_MSG91_AUTH_KEY=
_APP_VONAGE_API_KEY=
_APP_VONAGE_API_SECRET=
_APP_PHONE_AUTHY_API_KEY=
_APP_PHONE_VERIFICATION=disabled
_APP_LOGGING_PROVIDER=
_APP_LOGGING_CONFIG=
_APP_USAGE_STATS=enabled
_APP_USAGE_AGGREGATION_INTERVAL=30
_APP_VCS_GITHUB_APP_NAME=
_APP_VCS_GITHUB_APP_ID=
_APP_VCS_GITHUB_PRIVATE_KEY=
_APP_VCS_GITHUB_WEBHOOK_SECRET=
_APP_MAINTENANCE_INTERVAL=86400
_APP_MAINTENANCE_RETENTION_CACHE=172800
_APP_MAINTENANCE_RETENTION_EXECUTION=1209600
_APP_MAINTENANCE_RETENTION_ABUSE=86400
_APP_MAINTENANCE_RETENTION_AUDIT=1209600
_APP_GRAPHQL_MAX_BATCH_SIZE=10
_APP_GRAPHQL_MAX_COMPLEXITY=2500
_APP_GRAPHQL_MAX_DEPTH=3
_APP_OPTIONS_ABUSE=enabled
_APP_OPTIONS_AUDIT=enabled
_APP_OPTIONS_FORCE_HTTPS=disabled
_APP_OPTIONS_ROUTER_PROTECTION=enabled
_APP_ASSISTANT_OPENAI_API_KEY=
EOF

# --- Etapa 5: Finalização ---
echo "-> 5/5 - Configuração dos arquivos concluída."
echo ""
echo "### PROCESSO FINALIZADO COM SUCESSO! ###"
echo ""
echo "O arquivo docker-compose.yml e .env foram criados em ${APPWRITE_DIR}."
echo "As credenciais e chaves secretas foram geradas e salvas no arquivo .env."
echo ""
echo "Próximos passos recomendados:"
echo "1. Inicie o Appwrite com o comando:"
echo "   cd ${APPWRITE_DIR} && docker compose up -d"
echo ""
echo "2. Aguarde alguns minutos para que todos os serviços iniciem completamente."
echo ""
echo "3. Acesse o painel do Appwrite no seu navegador:"
echo "   http://SEU_IP_DA_VPS"
echo ""
echo "4. Crie sua conta de administrador e um novo projeto."
echo "5. Configure as variáveis de ambiente no arquivo .env.local do seu frontend com o Endpoint e o Project ID."

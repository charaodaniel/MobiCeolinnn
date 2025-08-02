-- Arquivo de setup do banco de dados para CEOLIN Mobilidade Urbana

-- Habilitar a extensão para usar UUIDs, se ainda não estiver habilitada
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabela de Usuários (users)
-- Armazena informações básicas de todos os usuários (passageiros, motoristas, administradores).
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('passenger', 'driver', 'admin')) DEFAULT 'passenger',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Perfis dos Motoristas (driver_profiles)
-- Armazena informações adicionais específicas dos motoristas.
CREATE TABLE driver_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    cnh_document_url VARCHAR(255),
    pix_key VARCHAR(255),
    status VARCHAR(50) NOT NULL CHECK (status IN ('online', 'offline', 'in_ride_urban', 'in_ride_rural')) DEFAULT 'offline',
    current_latitude DECIMAL(9, 6),
    current_longitude DECIMAL(9, 6),
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabela de Veículos (vehicles)
-- Armazena informações sobre os veículos dos motoristas.
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    model VARCHAR(100) NOT NULL,
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    photo_url VARCHAR(255),
    crlv_document_url VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabela de Corridas (rides)
-- Armazena todas as solicitações de corrida.
CREATE TABLE rides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    passenger_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Pode ser nulo para passageiros anônimos
    driver_id UUID REFERENCES users(id) ON DELETE SET NULL,
    origin_description TEXT NOT NULL,
    origin_latitude DECIMAL(9, 6),
    origin_longitude DECIMAL(9, 6),
    destination_description TEXT,
    destination_latitude DECIMAL(9, 6),
    destination_longitude DECIMAL(9, 6),
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled', 'negotiating')) DEFAULT 'pending',
    type VARCHAR(50) NOT NULL CHECK (type IN ('urban', 'rural')),
    fare DECIMAL(10, 2),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabela de Negociações (negotiations)
-- Armazena o histórico de chat e propostas para corridas rurais.
CREATE TABLE negotiations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ride_id UUID NOT NULL REFERENCES rides(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message_type VARCHAR(50) NOT NULL CHECK (message_type IN ('text', 'proposal')),
    content TEXT,
    amount DECIMAL(10, 2), -- Usado se message_type for 'proposal'
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Tabela de Avaliações (ratings)
-- Armazena as avaliações feitas pelos passageiros para os motoristas.
CREATE TABLE ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ride_id UUID NOT NULL REFERENCES rides(id) ON DELETE CASCADE,
    passenger_id UUID REFERENCES users(id) ON DELETE SET NULL,
    driver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. Tabela de Log de Status dos Motoristas (driver_status_logs)
-- Registra o histórico de mudanças de status dos motoristas para auditoria.
CREATE TABLE driver_status_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Índices para otimizar consultas comuns
CREATE INDEX idx_rides_passenger_id ON rides(passenger_id);
CREATE INDEX idx_rides_driver_id ON rides(driver_id);
CREATE INDEX idx_rides_status ON rides(status);
CREATE INDEX idx_negotiations_ride_id ON negotiations(ride_id);
CREATE INDEX idx_ratings_driver_id ON ratings(driver_id);
CREATE INDEX idx_driver_status_logs_driver_id ON driver_status_logs(driver_id);

-- Função para atualizar o campo 'updated_at' automaticamente
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para as tabelas que possuem o campo 'updated_at'
CREATE TRIGGER set_timestamp_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_driver_profiles
BEFORE UPDATE ON driver_profiles
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_vehicles
BEFORE UPDATE ON vehicles
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_rides
BEFORE UPDATE ON rides
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

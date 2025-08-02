-- =============================================================
--      Script de Criação do Banco de Dados - CEOLIN Mobilidade Urbana
-- =============================================================
-- Usar `CASCADE` garante que todas as dependências (como chaves
-- estrangeiras) sejam removidas, permitindo que o script seja
-- executado várias vezes sem erros.
-- =============================================================

-- Remove as tabelas antigas (se existirem) na ordem correta ou usando CASCADE
DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS negotiations CASCADE;
DROP TABLE IF EXISTS driver_status_logs CASCADE;
DROP TABLE IF EXISTS rides CASCADE;
DROP TABLE IF EXISTS driver_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Remove os tipos ENUM antigos (se existirem)
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS ride_status CASCADE;
DROP TYPE IF EXISTS ride_type CASCADE;
DROP TYPE IF EXISTS driver_availability_status CASCADE;


-- =============================================================
--      Definição de Tipos Personalizados (ENUMs)
-- =============================================================

CREATE TYPE user_role AS ENUM ('passageiro', 'motorista', 'admin');
CREATE TYPE ride_status AS ENUM ('pendente', 'aceita', 'em_andamento_urbano', 'em_andamento_intermunicipal', 'concluida', 'cancelada', 'negociando');
CREATE TYPE ride_type AS ENUM ('urbana', 'rural_intermunicipal');
CREATE TYPE driver_availability_status AS ENUM ('online', 'offline', 'em_viagem_urbano', 'em_viagem_intermunicipal');


-- =============================================================
--      Criação das Tabelas
-- =============================================================

-- Tabela de Usuários (comum a todos os perfis)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    profile_picture_url TEXT,
    role user_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela com informações específicas do motorista
CREATE TABLE driver_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    license_number VARCHAR(50) NOT NULL,
    vehicle_model VARCHAR(100) NOT NULL,
    license_plate VARCHAR(10) UNIQUE NOT NULL,
    vehicle_picture_url TEXT,
    cnh_picture_url TEXT,
    crlv_picture_url TEXT,
    pix_key VARCHAR(255),
    is_approved BOOLEAN DEFAULT FALSE,
    availability_status driver_availability_status DEFAULT 'offline',
    current_latitude REAL,
    current_longitude REAL,
    urban_fare_type VARCHAR(20) DEFAULT 'fixed', -- 'fixed' or 'km'
    urban_fare_value NUMERIC(10, 2) DEFAULT 25.00,
    accepts_rural_rides BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Corridas
CREATE TABLE rides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    passenger_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Passageiro pode ser nulo se a conta for excluída
    driver_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Motorista
    status ride_status NOT NULL,
    type ride_type NOT NULL,
    origin_address TEXT NOT NULL,
    origin_latitude REAL,
    origin_longitude REAL,
    destination_address TEXT,
    destination_latitude REAL,
    destination_longitude REAL,
    fare NUMERIC(10, 2), -- Valor final da corrida
    negotiated_fare NUMERIC(10, 2), -- Valor após negociação
    started_by user_role, -- Quem iniciou a corrida (passageiro, motorista, admin)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE
);

-- Tabela de Negociações (para corridas rurais/intermunicipais)
CREATE TABLE negotiations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ride_id UUID NOT NULL REFERENCES rides(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- Quem enviou a mensagem/proposta
    message TEXT,
    proposal_amount NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Avaliações
CREATE TABLE ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ride_id UUID UNIQUE NOT NULL REFERENCES rides(id) ON DELETE CASCADE,
    rater_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- Quem avaliou
    rated_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- Quem foi avaliado
    rating_value INT NOT NULL CHECK (rating_value >= 1 AND rating_value <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Log de Status do Motorista
CREATE TABLE driver_status_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status driver_availability_status NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- =============================================================
--      Índices para Otimização de Consultas
-- =============================================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_rides_status ON rides(status);
CREATE INDEX idx_rides_passenger_id ON rides(passenger_id);
CREATE INDEX idx_rides_driver_id ON rides(driver_id);
CREATE INDEX idx_driver_profiles_availability ON driver_profiles(availability_status);
CREATE INDEX idx_ratings_rated_id ON ratings(rated_id);

-- Adicionar aqui inserts iniciais para testes, se necessário (ex: usuário admin)
-- Exemplo:
-- INSERT INTO users (name, email, password_hash, role) VALUES ('Admin Ceolin', 'admin@mobiceolin.com', 'hash_da_senha_admin123', 'admin');

-- Fim do Script

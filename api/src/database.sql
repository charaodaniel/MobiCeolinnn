-- Arquivo de setup do banco de dados para o projeto CEOLIN Mobilidade Urbana
-- Este script contém as definições de tabelas para um banco de dados PostgreSQL.

-- Apagar tabelas existentes (se necessário, para um ambiente de desenvolvimento limpo)
DROP TABLE IF EXISTS driver_status_logs;
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS negotiations;
DROP TABLE IF EXISTS rides;
DROP TABLE IF EXISTS drivers_profiles;
DROP TABLE IF EXISTS users;

-- Criar tipos ENUM para padronizar valores de status e perfis
CREATE TYPE user_role AS ENUM ('passenger', 'driver', 'admin');
CREATE TYPE ride_status AS ENUM ('pending', 'accepted', 'in_progress', 'completed', 'cancelled', 'negotiating');
CREATE TYPE ride_type AS ENUM ('urban', 'rural');
CREATE TYPE driver_status AS ENUM ('offline', 'online', 'urban-trip', 'rural-trip');
CREATE TYPE negotiation_status AS ENUM ('pending', 'accepted', 'rejected');

-- Tabela principal de usuários
-- Armazena dados de login para todos os tipos de usuários.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'passenger',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Tabela com informações adicionais para motoristas
CREATE TABLE drivers_profiles (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    vehicle_model VARCHAR(255),
    license_plate VARCHAR(20) UNIQUE,
    cnh_document_url VARCHAR(255),
    crlv_document_url VARCHAR(255),
    vehicle_photo_url VARCHAR(255),
    pix_key VARCHAR(255),
    current_status driver_status DEFAULT 'offline',
    current_latitude DECIMAL(9, 6),
    current_longitude DECIMAL(9, 6),
    avg_rating DECIMAL(3, 2) DEFAULT 5.0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela principal para armazenar todas as corridas
CREATE TABLE rides (
    id SERIAL PRIMARY KEY,
    passenger_id INTEGER REFERENCES users(id) ON DELETE SET NULL, -- Passageiro pode não ser registrado
    driver_id INTEGER REFERENCES users(id) ON DELETE SET NULL, -- Motorista é definido depois
    status ride_status NOT NULL,
    type ride_type NOT NULL,
    origin_address VARCHAR(255),
    origin_latitude DECIMAL(9, 6),
    origin_longitude DECIMAL(9, 6),
    destination_address VARCHAR(255),
    destination_latitude DECIMAL(9, 6),
    destination_longitude DECIMAL(9, 6),
    fare DECIMAL(10, 2),
    requested_at TIMESTAMPTZ DEFAULT NOW(),
    accepted_at TIMESTAMPTZ,
    picked_up_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    notes TEXT -- Para registrar eventos como troca de motorista
);

-- Tabela para o chat de negociação de corridas rurais/intermunicipais
CREATE TABLE negotiations (
    id SERIAL PRIMARY KEY,
    ride_id INTEGER NOT NULL REFERENCES rides(id) ON DELETE CASCADE,
    sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT,
    proposed_fare DECIMAL(10, 2),
    status negotiation_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para avaliações das corridas
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    ride_id INTEGER UNIQUE NOT NULL REFERENCES rides(id) ON DELETE CASCADE,
    passenger_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    driver_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para registrar o histórico de status de um motorista (log)
CREATE TABLE driver_status_logs (
    id SERIAL PRIMARY KEY,
    driver_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status driver_status NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para otimizar consultas comuns
CREATE INDEX idx_rides_status ON rides(status);
CREATE INDEX idx_rides_driver_id ON rides(driver_id);
CREATE INDEX idx_rides_passenger_id ON rides(passenger_id);
CREATE INDEX idx_driver_status_logs_driver_id ON driver_status_logs(driver_id);


-- Inserir dados de exemplo para teste
INSERT INTO users (name, email, password_hash, role) VALUES
('Admin User', 'admin@mobiceolin.com', '$2b$10$f/a5r.s.x5C6E6A7B8C9D0e', 'admin'), -- Senha: admin123 (exemplo, use um hash real)
('João Passageiro', 'joao@email.com', '$2b$10$g/h1i.j.k1L2M3N4O5P6q7r', 'passenger'), -- Senha: 123456
('Carlos Motorista', 'carlos@email.com', '$2b$10$s/t1u.v.w1X2Y3Z4A5B6c7d', 'driver'), -- Senha: 123456
('Roberto Freire', 'roberto.f@email.com', '$2b$10$d/e1f.g.h1I2J3K4L5M6n7o', 'driver');

-- Inserir perfil de motorista
INSERT INTO drivers_profiles (user_id, vehicle_model, license_plate, pix_key, current_status) VALUES
((SELECT id FROM users WHERE email = 'carlos@email.com'), 'Toyota Corolla', 'BRA2E19', 'carlos.motorista@email.com', 'online'),
((SELECT id FROM users WHERE email = 'roberto.f@email.com'), 'Chevrolet Onix', 'ABC9876', '(11) 98765-4321', 'online');


-- Fim do Script

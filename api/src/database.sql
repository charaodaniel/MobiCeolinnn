-- Arquivo de script para criar a estrutura inicial do banco de dados PostgreSQL
-- para a aplicação CEOLIN Mobilidade Urbana.

-- Apaga tabelas existentes na ordem correta para evitar erros de dependência.
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS negotiations;
DROP TABLE IF EXISTS driver_status_logs;
DROP TABLE IF EXISTS rides;
DROP TABLE IF EXISTS driver_profiles;
DROP TABLE IF EXISTS users;

-- Apaga tipos ENUM existentes.
DROP TYPE IF EXISTS user_role;
DROP TYPE IF EXISTS ride_status;
DROP TYPE IF EXISTS ride_type;
DROP TYPE IF EXISTS driver_status;

-- Tipos personalizados (ENUMs) para garantir a consistência dos dados.

-- Define os perfis de usuário possíveis no sistema.
CREATE TYPE user_role AS ENUM ('passenger', 'driver', 'admin');

-- Define os status possíveis para uma corrida.
CREATE TYPE ride_status AS ENUM (
  'pending',        -- Aguardando motorista aceitar
  'accepted',       -- Motorista aceitou, a caminho do passageiro
  'in_progress',    -- Viagem em andamento
  'completed',      -- Viagem concluída
  'cancelled',      -- Viagem cancelada
  'negotiating'     -- Corrida rural/intermunicipal aguardando propostas
);

-- Define os tipos de corrida.
CREATE TYPE ride_type AS ENUM ('urban', 'rural_interurban');

-- Define os status de disponibilidade do motorista.
CREATE TYPE driver_status AS ENUM ('online', 'offline', 'in_trip_urban', 'in_trip_rural_interurban');


-- Tabela de Usuários (comum a todos os perfis)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Tabela com informações de perfil específicas para motoristas
CREATE TABLE driver_profiles (
    user_id INT PRIMARY KEY,
    vehicle_model VARCHAR(100),
    license_plate VARCHAR(20) UNIQUE,
    pix_key VARCHAR(255),
    cnh_document_url VARCHAR(255),
    crlv_document_url VARCHAR(255),
    vehicle_photo_url VARCHAR(255),
    status driver_status DEFAULT 'offline',
    is_approved BOOLEAN DEFAULT false,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de Corridas
CREATE TABLE rides (
    id SERIAL PRIMARY KEY,
    passenger_id INT NOT NULL,
    driver_id INT,
    status ride_status NOT NULL DEFAULT 'pending',
    ride_type ride_type NOT NULL,
    origin_address TEXT NOT NULL,
    origin_lat DECIMAL(10, 8),
    origin_lng DECIMAL(11, 8),
    destination_address TEXT,
    destination_lat DECIMAL(10, 8),
    destination_lng DECIMAL(11, 8),
    estimated_fare DECIMAL(10, 2),
    final_fare DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY (passenger_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (driver_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabela para registrar o histórico de status dos motoristas
CREATE TABLE driver_status_logs (
    id SERIAL PRIMARY KEY,
    driver_id INT NOT NULL,
    status driver_status NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de Negociações (para corridas rurais/intermunicipais)
CREATE TABLE negotiations (
    id SERIAL PRIMARY KEY,
    ride_id INT NOT NULL,
    user_id INT NOT NULL, -- Quem enviou a mensagem/proposta (motorista ou passageiro)
    message TEXT,
    proposal_amount DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ride_id) REFERENCES rides(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de Avaliações
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    ride_id INT NOT NULL,
    rater_id INT NOT NULL, -- Quem está avaliando (geralmente o passageiro)
    rated_id INT NOT NULL, -- Quem está sendo avaliado (geralmente o motorista)
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ride_id) REFERENCES rides(id) ON DELETE CASCADE,
    FOREIGN KEY (rater_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (rated_id) REFERENCES users(id) ON DELETE CASCADE
);


-- Índices para otimizar consultas frequentes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_rides_status ON rides(status);
CREATE INDEX idx_rides_passenger_id ON rides(passenger_id);
CREATE INDEX idx_rides_driver_id ON rides(driver_id);
CREATE INDEX idx_driver_profiles_status ON driver_profiles(status);
CREATE INDEX idx_driver_status_logs_driver_id ON driver_status_logs(driver_id);

-- Inserir dados de exemplo para teste
INSERT INTO users (name, email, password_hash, role, is_active) VALUES
('Admin Ceolin', 'admin@mobiceolin.com', '$2b$10$f.o9A.SpF9LpM/d4.vj8luJb8w.LzC1V2P8/u.N1NqGeBiV7U.s5K', 'admin', true), -- senha: admin123
('Carlos Motorista', 'carlos@email.com', '$2b$10$0zT0N/q1Y5X1e.4Q2.e6C.e0m4g2Ym8N3j9p3C8m1V7z6Y/o9w4nS', 'driver', true), -- senha: 123456
('João Passageiro', 'joao@email.com', '$2b$10$0zT0N/q1Y5X1e.4Q2.e6C.e0m4g2Ym8N3j9p3C8m1V7z6Y/o9w4nS', 'passenger', true); -- senha: 123456

-- Inserir perfil para o motorista de exemplo
INSERT INTO driver_profiles (user_id, vehicle_model, license_plate, pix_key, is_approved, status) VALUES
((SELECT id FROM users WHERE email = 'carlos@email.com'), 'Toyota Corolla', 'BRA2E19', 'carlos.motorista@email.com', true, 'online');

-- Exemplo de log de status inicial
INSERT INTO driver_status_logs (driver_id, status) VALUES
((SELECT id FROM users WHERE email = 'carlos@email.com'), 'online');


-- FIM DO SCRIPT --

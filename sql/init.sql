-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(20) DEFAULT 'operador',
  activo BOOLEAN DEFAULT TRUE,
  fecha_registro TIMESTAMP DEFAULT NOW(),
  ultimo_acceso TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de tickets
CREATE TABLE IF NOT EXISTS tickets (
  id BIGSERIAL PRIMARY KEY,
  usuario_id BIGINT NOT NULL REFERENCES usuarios(id),
  total DECIMAL(10, 2) NOT NULL,
  cantidad_jugadas INT NOT NULL,
  estado VARCHAR(20) DEFAULT 'completado',
  fecha TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de jugadas
CREATE TABLE IF NOT EXISTS jugadas (
  id BIGSERIAL PRIMARY KEY,
  ticket_id BIGINT NOT NULL REFERENCES tickets(id),
  loteria VARCHAR(50) NOT NULL,
  numero VARCHAR(2) NOT NULL,
  animal VARCHAR(50),
  monto DECIMAL(10, 2) NOT NULL,
  fecha TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (ticket_id) REFERENCES tickets(id)
);

-- Tabla de auditoría
CREATE TABLE IF NOT EXISTS auditorias (
  id BIGSERIAL PRIMARY KEY,
  usuario_id BIGINT NOT NULL REFERENCES usuarios(id),
  accion VARCHAR(100) NOT NULL,
  detalles JSONB,
  timestamp TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Índices para optimización
CREATE INDEX IF NOT EXISTS idx_tickets_usuario ON tickets(usuario_id);
CREATE INDEX IF NOT EXISTS idx_tickets_fecha ON tickets(fecha);
CREATE INDEX IF NOT EXISTS idx_jugadas_ticket ON jugadas(ticket_id);
CREATE INDEX IF NOT EXISTS idx_jugadas_loteria ON jugadas(loteria);
CREATE INDEX IF NOT EXISTS idx_auditorias_usuario ON auditorias(usuario_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE jugadas ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditorias ENABLE ROW LEVEL SECURITY;

-- Políticas RLS - Los usuarios solo ven sus propios datos
CREATE POLICY "Usuarios ven sus propios datos" ON usuarios
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Usuarios ven sus propios tickets" ON tickets
  FOR SELECT USING (auth.uid()::text = usuario_id::text);

CREATE POLICY "Usuarios ven sus propias jugadas" ON jugadas
  FOR SELECT USING (
    ticket_id IN (
      SELECT id FROM tickets WHERE usuario_id = auth.uid()::bigint
    )
  );

CREATE POLICY "Usuarios ven su propia auditoría" ON auditorias
  FOR SELECT USING (auth.uid()::text = usuario_id::text);

-- Inserts de prueba (opcional)
-- INSERT INTO usuarios (username, email, password, rol) VALUES 
-- ('admin', 'admin@goldenking.com', '$2a$10$...', 'admin'),
-- ('operador1', 'op1@goldenking.com', '$2a$10$...', 'operador');

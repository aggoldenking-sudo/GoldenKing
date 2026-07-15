# 🚀 Golden King - Backend Setup

## Instalación Local

### 1. Clonar y instalar dependencias
```bash
git clone https://github.com/aggoldenking-sudo/GoldenKing.git
cd GoldenKing
git checkout feature/backend-infrastructure
npm install
```

### 2. Configurar variables de entorno
Copia `.env.local.example` a `.env.local` y completa:

```bash
cp .env.local.example .env.local
```

Edita `.env.local` con:
- `SUPABASE_SERVICE_ROLE_KEY` → Tu service role key de Supabase
- `JWT_SECRET` → Genera uno: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 3. Inicializar Supabase

1. Ve a tu panel de Supabase: https://app.supabase.com
2. Selecciona tu proyecto
3. Ve a SQL Editor → New Query
4. Copia y ejecuta el contenido de `sql/init.sql`

### 4. Ejecutar en desarrollo
```bash
npm run dev
```

Vercel dev server estará en `http://localhost:3000`

---

## 📡 Endpoints API

### Auth

#### `POST /api/auth/login`
Login de usuario

**Request:**
```json
{
  "email": "admin@goldenking.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "mensaje": "Login exitoso",
  "token": "eyJhbGc...",
  "usuario": {
    "id": 1,
    "username": "admin",
    "email": "admin@goldenking.com",
    "rol": "admin"
  }
}
```

#### `POST /api/auth/register`
Registrar nuevo usuario

**Request:**
```json
{
  "username": "operador1",
  "email": "op1@goldenking.com",
  "password": "password123"
}
```

---

### Jugadas

#### `POST /api/jugadas/crear`
Crear ticket con jugadas

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "jugadas": [
    {
      "loteria": "Lotto Activo",
      "numero": "01",
      "animal": "🐏 Carnero",
      "monto": 100
    },
    {
      "loteria": "La Granjita",
      "numero": "05",
      "animal": "🦁 León",
      "monto": 50
    }
  ]
}
```

**Response:**
```json
{
  "mensaje": "Ticket creado exitosamente",
  "ticket": {
    "id": 1,
    "total": 150,
    "cantidad_jugadas": 2,
    "jugadas": [...]
  }
}
```

---

### Reportes

#### `GET /api/reportes/ventas`
Obtener reportes de ventas

**Headers:**
```
Authorization: Bearer {token}
```

**Query Params:**
- `fechaInicio` (opcional): YYYY-MM-DD
- `fechaFin` (opcional): YYYY-MM-DD

**Response:**
```json
{
  "resumen": {
    "totalVentas": 1500,
    "cantidadTickets": 5,
    "promedioPorTicket": 300,
    "periodo": {...}
  },
  "porLoteria": {
    "Lotto Activo": {
      "total": 800,
      "cantidad": 3
    }
  },
  "tickets": [...]
}
```

---

## 🔐 Autenticación

El sistema usa **JWT (JSON Web Tokens)**.

### Flujo:
1. Usuario hace login → recibe `token`
2. En cada request, envía: `Authorization: Bearer {token}`
3. Backend verifica el token
4. Si es válido, procesa la solicitud

### Token ejemplo (decodificado):
```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@goldenking.com",
  "rol": "admin",
  "iat": 1234567890,
  "exp": 1234654290
}
```

---

## 🗄️ Estructura BD

### Tabla: `usuarios`
- `id` - ID único
- `username` - Nombre de usuario único
- `email` - Email único
- `password` - Contraseña hasheada (bcrypt)
- `rol` - admin, operador, supervisor
- `activo` - Boolean
- `fecha_registro` - Timestamp
- `ultimo_acceso` - Timestamp

### Tabla: `tickets`
- `id` - ID único
- `usuario_id` - Referencia a usuario
- `total` - Monto total
- `cantidad_jugadas` - Cantidad de jugadas
- `estado` - completado, cancelado, pendiente
- `fecha` - Timestamp

### Tabla: `jugadas`
- `id` - ID único
- `ticket_id` - Referencia a ticket
- `loteria` - Nombre de la lotería
- `numero` - Número jugado (00-99)
- `animal` - Nombre del animal
- `monto` - Monto apostado
- `fecha` - Timestamp

### Tabla: `auditorias`
- `id` - ID único
- `usuario_id` - Referencia a usuario
- `accion` - LOGIN, CREAR_TICKET, etc
- `detalles` - JSONB con datos adicionales
- `timestamp` - Timestamp

---

## 🔍 Testing

### Test de login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@goldenking.com","password":"password123"}'
```

### Test de crear ticket (con token):
```bash
curl -X POST http://localhost:3000/api/jugadas/crear \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {tu_token_aqui}" \
  -d '{
    "jugadas": [
      {
        "loteria": "Lotto Activo",
        "numero": "01",
        "animal": "🐏 Carnero",
        "monto": 100
      }
    ]
  }'
```

---

## 📝 Próximos pasos

1. ✅ Crear tablas en Supabase (SQL)
2. ⬜ Crear usuario admin (insert en DB)
3. ⬜ Conectar frontend con API
4. ⬜ Implementar módulo de reportes
5. ⬜ Agregar gestión de usuarios
6. ⬜ Deploy en Vercel

---

## 🆘 Troubleshooting

### Error: "Missing Supabase configuration"
- Verifica que `.env.local` tenga las variables correctas
- Recarga el servidor

### Error: "Token inválido"
- El JWT puede haber expirado (24h)
- Haz login de nuevo

### Error: "Method not allowed"
- Asegúrate que el verbo HTTP sea correcto (GET, POST, etc)

---

¡Listo! 🎉 Tu backend está configurado.

# Bizy Turnera

SaaS moderno para la **gestión de turnos y clientes** para pequeños negocios como:

* Barberías
* Clínicas
* Nutricionistas
* Veterinarias
* Profesionales independientes

El sistema permite administrar:

* Turnos
* Clientes
* Servicios
* Pagos
* Deudas

Todo dentro de un **sistema multi-tenant**, donde cada negocio tiene sus propios datos aislados.

---

# 🚀 Tech Stack

## Backend

* NestJS
* TypeORM
* PostgreSQL
* JWT Authentication
* Passport
* Docker
* Class Validator

## Frontend

* Next.js 16
* React
* TypeScript
* React Query
* Zod
* Axios
* TailwindCSS
* shadcn/ui

---

# 🏗 Arquitectura

El sistema está construido como **SaaS multi-tenant con una sola base de datos**.

Cada registro pertenece a un negocio (`businessId`).

Ejemplo:

```
Client
 └ businessId

Service
 └ businessId

Appointment
 └ businessId
```

Esto garantiza que:

* Cada negocio solo accede a sus datos
* No hay filtrado manual desde el frontend
* Toda la seguridad se maneja desde el backend

---

# 🔐 Autenticación

El sistema usa **JWT Authentication**.

Flujo:

```
login
 ↓
JWT token
 ↓
Authorization Bearer Token
 ↓
AuthGuard
 ↓
request.user
```

Payload JWT:

```
{
  sub: userId,
  businessId: businessId,
  role: "admin | staff"
}
```

---

# 👥 Roles

El sistema maneja dos roles:

## Admin

Dueño del negocio.

Puede:

* gestionar usuarios
* eliminar clientes
* eliminar servicios
* ver métricas
* configurar el negocio

## Staff

Empleado.

Puede:

* crear clientes
* editar clientes
* crear turnos
* registrar pagos

---

# 📦 Módulos del sistema

## Auth

Autenticación y registro.

Endpoints:

```
POST /auth/register
POST /auth/login
GET /auth/profile
```

---

## Clients

Gestión de clientes.

Endpoints:

```
GET /clients
POST /clients
PATCH /clients/:id
DELETE /clients/:id
```

---

## Services

Servicios ofrecidos por el negocio.

Endpoints:

```
GET /services
POST /services
PATCH /services/:id
DELETE /services/:id
```

---

## Appointments

Gestión de turnos.

Endpoints:

```
GET /appointments
POST /appointments
PATCH /appointments/:id
DELETE /appointments/:id
```

---

## Payments

Registro de pagos y control de deuda.

Endpoints:

```
GET /payments
POST /payments
```

---

# 🗄 Base de datos

Entidades principales:

```
Business
User
Client
Service
Appointment
Payment
```

Ejemplo de entidad Client:

```
Client
 ├ id
 ├ fullName
 ├ phone
 ├ debt
 ├ createdAt
 ├ updatedAt
 └ businessId
```

---

# ⚙️ Instalación

## 1 Clonar repositorio

```
git clone https://github.com/tuusuario/bizy-turnera.git
```

---

## 2 Backend

```
cd backend
npm install
```

Configurar variables de entorno

Levantar servidor:

```
npm run start:dev
```

---

## 3 Frontend

```
cd frontend
npm install
npm run dev
```

---

# 🧪 Seed de datos

El proyecto incluye un seed para generar datos de prueba.

```
POST /seed
```

Esto genera:

* negocios
* usuarios
* clientes
* servicios

---

# 📊 Dashboard

El panel incluye métricas como:

* ingresos del mes
* clientes activos
* turnos del día
* deuda pendiente

---

# 🎨 UI

La interfaz usa:

* TailwindCSS
* shadcn/ui
* diseño limpio estilo SaaS moderno

---

# 📁 Estructura del proyecto

```
backend
 ├ auth
 ├ clients
 ├ services
 ├ appointments
 ├ payments
 ├ seed

frontend
 ├ api
 ├ hooks
 ├ components
 ├ schemas
 ├ app
```

---

# 🧠 Conceptos importantes

### Multi-tenant

Todos los datos se filtran por:

```
businessId
```

Ejemplo:

```
WHERE businessId = user.businessId
```

---

### Seguridad

El backend valida:

* JWT
* roles
* businessId

El frontend **nunca controla permisos**.

---

# 🛣 Roadmap

Próximas funcionalidades:

* módulo de pagos
* recordatorios de turnos
* reportes financieros
* exportación de datos
* suscripciones SaaS

---

# 📄 Licencia

MIT

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

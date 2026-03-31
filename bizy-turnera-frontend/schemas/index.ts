import { z } from "zod";

/* =========================
   AUTH
========================= */

export const loginSchema = z.object({
  email: z.string().email("Introduce un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const loginResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
  role: z.string(),
  businessId: z.string(),
  token: z.string(),
});

export const registroSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Introduce un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  businessName: z.string().min(2, "El nombre del negocio es obligatorio"),
});

/* =========================
   CLIENTS
========================= */

export const clienteSchema = z.object({
  fullName: z.string().min(2, "El nombre es obligatorio"),
  phone: z.string(),
});

export const clientResponseSchema = clienteSchema.extend({
  id: z.string(),
});

/* =========================
   SERVICES
========================= */

export const servicioSchema = z.object({
  name: z.string().min(2, "El nombre del servicio es obligatorio"),
  duration: z
    .number({ invalid_type_error: "Ingresá un número válido" })
    .min(5)
    .max(480),
  price: z.number({ invalid_type_error: "Ingresá un precio válido" }).min(0),
});

export const serviceResponseSchema = servicioSchema.extend({
  id: z.string(),
});

/* =========================
   APPOINTMENTS
========================= */

export type EstadoTurno =
  | "PENDING"
  | "COMPLETED"
  | "CANCELED"
  | "pending"
  | "completed"
  | "canceled";

/* FORM (crear turno) */
export const turnoCreateSchema = z.object({
  clientId: z.string().min(1, "Seleccioná un cliente"),
  serviceId: z.string().min(1, "Seleccioná un servicio"),
  userId: z.string().min(1, "Seleccioná un profesional"),
  startAt: z.string(),
  notes: z.string().optional(),
});

/* RESPONSE (mostrar turno) */
export const appointmentSchema = z.object({
  id: z.string(),
  startAt: z.string(),
  endAt: z.string(),
  status: z.enum([
    "PENDING",
    "COMPLETED",
    "CANCELED",
    "pending",
    "completed",
    "canceled",
  ]),
  notes: z.string().nullable().optional(),

  client: z.object({
    id: z.string(),
    fullName: z.string(),
  }),

  service: z.object({
    id: z.string(),
    name: z.string(),
  }),

  user: z.object({
    id: z.string(),
    fullName: z.string(),
  }),
});

/* =========================
   PAYMENTS
========================= */

export const pagoSchema = z.object({
  clienteId: z.string().min(1, "Seleccioná un cliente"),
  monto: z.number().min(1),
  metodo: z.enum(["efectivo", "transferencia"]),
  concepto: z.string().min(2),
});

/* =========================
   ROLE
========================= */

export const roleSchema = z.enum(["admin", "staff"]);

/* =========================
   USER
========================= */

export const userSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string(),
  role: roleSchema,
  isActive: z.boolean(),
  businessId: z.string(),
});

/* =========================
   BUSINESS
========================= */

export const businessSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  plan: z.enum(["free", "pro"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/* =========================
   TYPES
========================= */

export type LoginFormData = z.infer<typeof loginSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type RegistroFormData = z.infer<typeof registroSchema>;

export type ClienteFormData = z.infer<typeof clienteSchema>;
export type Client = z.infer<typeof clientResponseSchema>;

export type ServicioFormData = z.infer<typeof servicioSchema>;
export type Service = z.infer<typeof serviceResponseSchema>;

export type TurnoCreateData = z.infer<typeof turnoCreateSchema>;
export type Appointment = z.infer<typeof appointmentSchema>;

export type PagoFormData = z.infer<typeof pagoSchema>;

export type User = z.infer<typeof userSchema>;
export type Business = z.infer<typeof businessSchema>;
export type Role = z.infer<typeof roleSchema>;

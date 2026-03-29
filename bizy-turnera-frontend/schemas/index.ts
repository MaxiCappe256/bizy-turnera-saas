import { z } from "zod";

// ----- Auth -----
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Introduce un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const loginResponse = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
  role: z.string(),
  businessId: z.string().nullable().optional(),
  token: z.string(),
});

export const registroSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Introduce un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  businessName: z.string().min(2, "El nombre del negocio es obligatorio"),
});

// ----- Clientes -----
export const clienteSchema = z.object({
  fullName: z.string().min(2, "El nombre es obligatorio"),
  phone: z
    .string()
});

// ----- Servicios -----
export const servicioSchema = z.object({
  nombre: z.string().min(2, "El nombre del servicio es obligatorio"),
  duracionMinutos: z
    .number({ invalid_type_error: "Ingresá un número válido" })
    .min(5, "La duración mínima es 5 minutos")
    .max(480, "La duración máxima es 8 horas"),
  precio: z
    .number({ invalid_type_error: "Ingresá un precio válido" })
    .min(0, "El precio no puede ser negativo"),
});

// ----- Turnos -----
export const turnoSchema = z.object({
  clienteId: z.string().min(1, "Seleccioná un cliente"),
  servicioId: z.string().min(1, "Seleccioná un servicio"),
  fecha: z.string().min(1, "La fecha es obligatoria"),
  hora: z.string().min(1, "La hora es obligatoria"),
});

// ----- Pagos -----
export const pagoSchema = z.object({
  clienteId: z.string().min(1, "Seleccioná un cliente"),
  monto: z
    .number({ invalid_type_error: "Ingresá un monto válido" })
    .min(1, "El monto debe ser mayor a 0"),
  metodo: z.enum(["efectivo", "transferencia"], {
    required_error: "Seleccioná un método de pago",
  }),
  concepto: z.string().min(2, "El concepto es obligatorio"),
});

// ----- Role -----
export const roleSchema = z.enum(["admin", "staff"]);
export type Role = z.infer<typeof roleSchema>;


// ----- User -----
export const userSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string(),
  role: roleSchema,
  isActive: z.boolean(),
  businessId: z.string(),
});


// ----- Business -----
export const businessSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  plan: z.enum(["free", "pro"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegistroFormData = z.infer<typeof registroSchema>;
export type ClienteFormData = z.infer<typeof clienteSchema>;
export type ServicioFormData = z.infer<typeof servicioSchema>;
export type TurnoFormData = z.infer<typeof turnoSchema>;
export type PagoFormData = z.infer<typeof pagoSchema>;
export type LoginResponseData = z.infer<typeof loginResponse>;
export type User = z.infer<typeof userSchema>;
export type Business = z.infer<typeof businessSchema>;

// =========================================================
// Mock data — desacoplado, listo para reemplazar por API
// =========================================================

export type MetodoPago = "efectivo" | "transferencia"
export type EstadoDeuda = "al_dia" | "con_deuda"

// ----- Clientes -----
export interface Cliente {
  id: string
  fullName: string
  phone: string
  estadoDeuda: EstadoDeuda
  deudaMonto: number
}

// export const mockClientes: Cliente[] = [
//   { id: "c1", nombre: "Lucía Fernández", telefono: "+54 11 2345-6789", estadoDeuda: "al_dia", deudaMonto: 0 },
//   { id: "c2", nombre: "Marcos Rodríguez", telefono: "+54 11 9876-5432", estadoDeuda: "con_deuda", deudaMonto: 3500 },
//   { id: "c3", nombre: "Valentina Gómez", telefono: "+54 9 351 123-4567", estadoDeuda: "al_dia", deudaMonto: 0 },
//   { id: "c4", nombre: "Santiago López", telefono: "+54 11 5555-1234", estadoDeuda: "con_deuda", deudaMonto: 1200 },
//   { id: "c5", nombre: "Camila Torres", telefono: "+54 9 261 987-6543", estadoDeuda: "al_dia", deudaMonto: 0 },
//   { id: "c6", nombre: "Nicolás Herrera", telefono: "+54 11 7777-8888", estadoDeuda: "al_dia", deudaMonto: 0 },
//   { id: "c7", nombre: "Florencia Martínez", telefono: "+54 9 11 3333-4444", estadoDeuda: "con_deuda", deudaMonto: 800 },
// ]

// // ----- Servicios -----
// export interface Servicio {
//   id: string
//   name: string
//   duracionMinutos: number
//   precio: number


// export const mockServicios: Servicio[] = [
//   { id: "s1", nombre: "Corte de cabello", duracionMinutos: 30, precio: 2500 },
//   { id: "s2", nombre: "Barba completa", duracionMinutos: 20, precio: 1800 },
//   { id: "s3", nombre: "Corte + Barba", duracionMinutos: 45, precio: 3800 },
//   { id: "s4", nombre: "Consulta nutricional", duracionMinutos: 60, precio: 5000 },
//   { id: "s5", nombre: "Consulta veterinaria", duracionMinutos: 40, precio: 4200 },
//   { id: "s6", nombre: "Tintura", duracionMinutos: 90, precio: 6500 },
// ]

// ----- Turnos -----
export interface Turno {
  id: string
  clienteId: string
  clienteNombre: string
  servicioId: string
  servicioNombre: string
  fecha: string
  hora: string
  estado: EstadoTurno
}

export const mockTurnos: Turno[] = [
  { id: "t1", clienteId: "c1", clienteNombre: "Lucía Fernández", servicioId: "s1", servicioNombre: "Corte de cabello", fecha: "2025-04-10", hora: "10:00", estado: "completado" },
  { id: "t2", clienteId: "c2", clienteNombre: "Marcos Rodríguez", servicioId: "s3", servicioNombre: "Corte + Barba", fecha: "2025-04-10", hora: "11:00", estado: "pendiente" },
  { id: "t3", clienteId: "c3", clienteNombre: "Valentina Gómez", servicioId: "s4", servicioNombre: "Consulta nutricional", fecha: "2025-04-10", hora: "12:00", estado: "cancelado" },
  { id: "t4", clienteId: "c4", clienteNombre: "Santiago López", servicioId: "s2", servicioNombre: "Barba completa", fecha: "2025-04-11", hora: "09:30", estado: "pendiente" },
  { id: "t5", clienteId: "c5", clienteNombre: "Camila Torres", servicioId: "s6", servicioNombre: "Tintura", fecha: "2025-04-11", hora: "14:00", estado: "pendiente" },
  { id: "t6", clienteId: "c6", clienteNombre: "Nicolás Herrera", servicioId: "s5", servicioNombre: "Consulta veterinaria", fecha: "2025-04-12", hora: "10:30", estado: "completado" },
  { id: "t7", clienteId: "c7", clienteNombre: "Florencia Martínez", servicioId: "s1", servicioNombre: "Corte de cabello", fecha: "2025-04-12", hora: "16:00", estado: "pendiente" },
]

// ----- Pagos -----
export interface Pago {
  id: string
  clienteId: string
  clienteNombre: string
  monto: number
  metodo: MetodoPago
  fecha: string
  concepto: string
}

export const mockPagos: Pago[] = [
  { id: "p1", clienteId: "c1", clienteNombre: "Lucía Fernández", monto: 2500, metodo: "efectivo", fecha: "2025-04-10", concepto: "Corte de cabello" },
  { id: "p2", clienteId: "c3", clienteNombre: "Valentina Gómez", monto: 5000, metodo: "transferencia", fecha: "2025-04-10", concepto: "Consulta nutricional" },
  { id: "p3", clienteId: "c6", clienteNombre: "Nicolás Herrera", monto: 4200, metodo: "efectivo", fecha: "2025-04-12", concepto: "Consulta veterinaria" },
  { id: "p4", clienteId: "c5", clienteNombre: "Camila Torres", monto: 6500, metodo: "transferencia", fecha: "2025-04-09", concepto: "Tintura" },
  { id: "p5", clienteId: "c1", clienteNombre: "Lucía Fernández", monto: 1800, metodo: "efectivo", fecha: "2025-04-08", concepto: "Barba completa" },
]

// ----- Dashboard Stats -----
export const mockStats = {
  ingresosHoy: 11700,
  ingresosMes: 128400,
  turnosHoy: 5,
  turnosCompletadosHoy: 2,
  deudaPendienteTotal: 5500,
  clientesActivos: 7,
}

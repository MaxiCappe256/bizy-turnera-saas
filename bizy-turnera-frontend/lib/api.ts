// =========================================================
// lib/api.ts — Capa de abstracción para llamadas al backend
// Preparado para conectar con NestJS via REST
// =========================================================

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${getToken()}`,  // habilitar con auth real
      ...(options?.headers ?? {}),
    },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Error desconocido" }))
    throw new Error(error.message ?? `HTTP ${res.status}`)
  }

  return res.json() as Promise<T>
}

// ---- Clientes ----
export const clientesApi = {
  list: () => request("/clientes"),
  get: (id: string) => request(`/clientes/${id}`),
  create: (body: unknown) => request("/clientes", { method: "POST", body: JSON.stringify(body) }),
  update: (id: string, body: unknown) => request(`/clientes/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (id: string) => request(`/clientes/${id}`, { method: "DELETE" }),
}

// ---- Servicios ----
export const serviciosApi = {
  list: () => request("/servicios"),
  get: (id: string) => request(`/servicios/${id}`),
  create: (body: unknown) => request("/servicios", { method: "POST", body: JSON.stringify(body) }),
  update: (id: string, body: unknown) => request(`/servicios/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (id: string) => request(`/servicios/${id}`, { method: "DELETE" }),
}

// ---- Turnos ----
export const turnosApi = {
  list: () => request("/turnos"),
  get: (id: string) => request(`/turnos/${id}`),
  create: (body: unknown) => request("/turnos", { method: "POST", body: JSON.stringify(body) }),
  update: (id: string, body: unknown) => request(`/turnos/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (id: string) => request(`/turnos/${id}`, { method: "DELETE" }),
}

// ---- Pagos ----
export const pagosApi = {
  list: () => request("/pagos"),
  create: (body: unknown) => request("/pagos", { method: "POST", body: JSON.stringify(body) }),
}

// ---- Dashboard ----
export const dashboardApi = {
  stats: () => request("/dashboard/stats"),
  turnosRecientes: () => request("/dashboard/turnos-recientes"),
}

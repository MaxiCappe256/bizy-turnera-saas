import { Role } from 'src/auth/enums/role.enum';

export type SeedBusiness = {
  name: string;
  slug: string;
  plan: 'free' | 'pro';
};

export type SeedUser = {
  email: string;
  password: string;
  fullName: string;
  role: Role;
  businessSlug: string;
};

export type SeedClient = {
  fullName: string;
  phone?: string | null;
  businessSlug: string;
};

export type SeedService = {
  name: string;
  price: number;
  duration: number;
  businessSlug: string;
};

interface SeedData {
  businesses: SeedBusiness[];
  users: SeedUser[];
  clients: SeedClient[];
  services: SeedService[];
}

export const initialData: SeedData = {
  businesses: [
    {
      name: 'Urban Cuts',
      slug: 'urban-cuts',
      plan: 'pro',
    },
    {
      name: 'Clínica Vital',
      slug: 'clinica-vital',
      plan: 'pro',
    },
    {
      name: 'NutriBalance',
      slug: 'nutribalance',
      plan: 'free',
    },
  ],

  users: [
    // Urban Cuts
    {
      email: 'admin@urbancuts.com',
      password: '123456',
      fullName: 'Lucas Fernández',
      role: Role.admin,
      businessSlug: 'urban-cuts',
    },
    {
      email: 'barber@urbancuts.com',
      password: '123456',
      fullName: 'Martín Gómez',
      role: Role.staff,
      businessSlug: 'urban-cuts',
    },

    // Clínica Vital
    {
      email: 'admin@clinicavital.com',
      password: '123456',
      fullName: 'Dra. Valentina Ruiz',
      role: Role.admin,
      businessSlug: 'clinica-vital',
    },
    {
      email: 'recepcion@clinicavital.com',
      password: '123456',
      fullName: 'Carla Méndez',
      role: Role.staff,
      businessSlug: 'clinica-vital',
    },

    // NutriBalance
    {
      email: 'admin@nutribalance.com',
      password: '123456',
      fullName: 'Lic. Sofía Torres',
      role: Role.admin,
      businessSlug: 'nutribalance',
    },
  ],

  clients: [
    // Urban Cuts
    {
      fullName: 'Juan Pérez',
      phone: '3415123456',
      businessSlug: 'urban-cuts',
    },
    {
      fullName: 'Santiago López',
      phone: '3415987654',
      businessSlug: 'urban-cuts',
    },
    {
      fullName: 'Nicolás Ríos',
      phone: null,
      businessSlug: 'urban-cuts',
    },

    // Clínica Vital
    {
      fullName: 'María González',
      phone: '3414001122',
      businessSlug: 'clinica-vital',
    },
    {
      fullName: 'Ana Martínez',
      phone: '3414778899',
      businessSlug: 'clinica-vital',
    },

    // NutriBalance
    {
      fullName: 'Carlos Sánchez',
      phone: '3415112233',
      businessSlug: 'nutribalance',
    },
    {
      fullName: 'Lucía Herrera',
      phone: '3415334455',
      businessSlug: 'nutribalance',
    },
    {
      fullName: 'Federico Molina',
      phone: null,
      businessSlug: 'nutribalance',
    },
  ],

  services: [
    {
      name: 'Corte',
      duration: 30,
      price: 5000,
      businessSlug: 'urban-cuts',
    },
    {
      name: 'Barba',
      duration: 20,
      price: 3000,
      businessSlug: 'urban-cuts',
    },
    {
      name: 'Corte + Barba',
      duration: 45,
      price: 7500,
      businessSlug: 'urban-cuts',
    },
    {
      name: 'Perfilado de barba',
      duration: 15,
      price: 2500,
      businessSlug: 'urban-cuts',
    },
    {
      name: 'Lavado + Corte',
      duration: 40,
      price: 6500,
      businessSlug: 'urban-cuts',
    },
    {
      name: 'Corte premium',
      duration: 50,
      price: 9000,
      businessSlug: 'urban-cuts',
    },

    {
      name: 'Consulta inicial',
      duration: 60,
      price: 15000,
      businessSlug: 'nutribalance',
    },
    {
      name: 'Seguimiento nutricional',
      duration: 30,
      price: 9000,
      businessSlug: 'nutribalance',
    },
    {
      name: 'Plan alimentario personalizado',
      duration: 45,
      price: 12000,
      businessSlug: 'nutribalance',
    },
    {
      name: 'Control mensual',
      duration: 30,
      price: 8000,
      businessSlug: 'nutribalance',
    },
    {
      name: 'Consulta general',
      duration: 30,
      price: 12000,
      businessSlug: 'clinica-vital',
    },
    {
      name: 'Control médico',
      duration: 20,
      price: 9000,
      businessSlug: 'clinica-vital',
    },
    {
      name: 'Chequeo completo',
      duration: 60,
      price: 20000,
      businessSlug: 'clinica-vital',
    },
    {
      name: 'Consulta especialista',
      duration: 40,
      price: 15000,
      businessSlug: 'clinica-vital',
    },
  ],
};

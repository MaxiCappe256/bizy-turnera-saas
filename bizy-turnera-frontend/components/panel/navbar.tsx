'use client';

import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { useProfile } from '@/hooks/profile/useProfile';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const pageTitles: Record<string, string> = {
  '/panel': 'Panel',
  '/panel/clientes': 'Clientes',
  '/panel/servicios': 'Servicios',
  '/panel/turnos': 'Turnos',
  '/panel/pagos': 'Pagos',
  '/panel/configuracion': 'Configuración',
};

export function PanelNavbar() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? 'Panel';
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useProfile();

  const [mounted, setMounted] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    queryClient.clear();
    window.location.href = '/login';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };
  const initials = user?.fullName ? getInitials(user.fullName) : '';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) return null;

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-6">
      <h1 className="text-base font-semibold text-foreground">{title}</h1>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        {/* <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notificaciones"
        >
          <Bell className="h-4 w-4" />
          <span
            className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary"
            aria-hidden
          />
        </Button> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 rounded-full outline-none ring-ring focus-visible:ring-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium leading-none text-foreground">
                  {user?.fullName ?? ''}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/panel/configuracion">Configuración</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={handleLogout}
              className="text-destructive cursor-pointer"
            >
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

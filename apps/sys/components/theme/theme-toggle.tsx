/**
 * # components/theme/theme-toggle.tsx
 * * Define el componente de selector de tema para la aplicación.
 *   Permite al usuario cambiar entre tema claro, oscuro y sistema.
 */

"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * # Selector de Tema Claro/Oscuro/Sistema
 * 
 * ## Descripción:
 * Componente que permite al usuario seleccionar el tema de la aplicación.
 * Proporciona opciones para tema claro, oscuro o según preferencias del sistema.
 * 
 * ## Características
 * - Selector desplegable con tres opciones de tema
 * - Animaciones suaves en los iconos
 * - Soporte completo de accesibilidad
 * - Manejo automático de hidratación
 * - Persistencia automática del tema usando next-themes
 * 
 * ## Uso:
 * ```tsx
 * <ModeToggle />
 * ```
 */
export function ThemeToggle(): React.ReactElement | null {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme } = useTheme();

  // Prevenir hidratación incorrecta
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-md border transition-colors hover:bg-accent"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
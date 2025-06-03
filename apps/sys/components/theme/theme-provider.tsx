/**
 * # components/theme/theme-provider.tsx
 * * Define el proveedor de temas para la aplicación.
 *   Proporciona funcionalidad de temas (claro/oscuro) usando next-themes.
 */

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

/**
 * # Proveedor de Temas
 *
 * ## Descripción:
 * Componente que envuelve la aplicación para proporcionar funcionalidad de temas (claro/oscuro).
 * Utiliza next-themes para manejar la persistencia y cambios de tema.
 *
 * ## Características
 * - Soporte para temas claro, oscuro y sistema
 * - Persistencia automática del tema seleccionado
 * - Prevención de parpadeo en la hidratación
 * - Tipado estricto de TypeScript
 *
 * ## Uso:
 * ```tsx
 * import { ThemeProvider } from "@/components/theme/theme-provider"
 *
 * export default function Layout({ children }) {
 *   return (
 *     <ThemeProvider
 *       attribute="class"
 *       defaultTheme="system"
 *       enableSystem
 *       disableTransitionOnChange
 *     >
 *       {children}
 *     </ThemeProvider>
 *   )
 * }
 * ```
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
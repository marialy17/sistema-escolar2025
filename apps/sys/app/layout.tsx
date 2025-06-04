/**
 * # app/layout.tsx
 * * Define el layout principal de la aplicación
 *   Incluye: proveedor de temas, barra de navegación y contenido principal.
 */

import { ThemeProvider } from "@/components/theme/theme-provider";
import type { Metadata } from "next";
//import { Navbar } from "@/components/layout/navbar";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import "@/styles/globals.css";

/**
 * * Metadatos globales de la aplicación.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
  title: "Mi Negocio",
  description: "WebApp para gestionar mi negocio",
  icons: {
    icon: "/favicon.ico",
  },
};

/**
 * * Tipos de propiedades para el componente RootLayout.
 *
 * @property children - El contenido a renderizar dentro del layout.
 */
type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

/**
 * # Layout Principal de la Aplicación
 *
 * ## Descripción:
 * Componente raíz que define la estructura base y configuración global de la aplicación.
 *
 * ## Características
 * - Sistema de temas (claro/oscuro) con ThemeProvider
 * - Barra de navegación global persistente
 * - Estructura responsive mobile-first
 * - Manejo automático de hidratación
 * - Configuración de metadatos SEO
 * - Soporte multilenguaje (configurado en 'en')
 *
 * ## Estructura
 * ```
 * <html>
 *   <body>
 *     <ThemeProvider>
 *       <Navbar />
 *       <main>{children}</main>
 *     </ThemeProvider>
 *   </body>
 * </html>
 * ```
 *
 * ## Consideraciones Técnicas
 * - Utiliza React Server Components por defecto
 * - Implementa suppressHydrationWarning para prevenir warnings del tema
 * - Mantiene una estructura flex para ocupar el viewport completo
 *
 * @see {@link ThemeProvider} - Proveedor del sistema de temas
 * @see {@link Navbar} - Barra de navegación principal
 */
export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider className="flex flex-col">
              <SiteHeader />
              <div className="flex flex-1">
                <AppSidebar />
                <SidebarInset>
                  <div className="relative flex min-h-screen flex-col">
                    {/* <Navbar /> */}
                    <main className="flex-1">{children}</main>
                  </div>
                </SidebarInset>
              </div>
            </SidebarProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

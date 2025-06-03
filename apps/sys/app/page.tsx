/**
 * # app/page.tsx
 * * Página principal de la aplicación.
 *   Implementa un diseño centrado y responsive para el contenido inicial.
 */

/**
 * # Página de Inicio
 * 
 * ## Descripción:
 * Componente que representa la página principal de la aplicación.
 * 
 * ## Características
 * - Diseño centrado verticalmente
 * - Altura dinámica (ajustada al navbar)
 * - Estructura responsive
 * - Implementado como React Server Component por defecto
 * 
 * ## Uso:
 * Este componente se carga automáticamente como ruta principal ('/')
 */
export default function Home(): React.ReactElement {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center">
      <h1>Mi Negocio</h1>
    </div>
  );
}
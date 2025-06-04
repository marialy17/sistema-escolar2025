import { mutation, query } from "./_generated/server";

// Consulta para obtener todos los estudiantes
export const obtenerDatos = query({
  handler: async (ctx) => {
    return await ctx.db.query("prueba").collect();
  },
});
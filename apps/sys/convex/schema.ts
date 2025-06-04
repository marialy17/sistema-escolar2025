import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  prueba: defineTable({
    apodo: v.string(),
    nombre: v.string(),
    correo: v.string(),
  }),
});
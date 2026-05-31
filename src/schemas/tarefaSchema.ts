import { z } from "zod";

export const criarTarefaSchema = z.object({
  titulo: z.string().min(3, "Title must be at least 3 characters"),
});

export const atualizarTarefaSchema = z.object({
  titulo: z.string().min(3, "Title must be at least 3 characters").optional(),
  feito: z.boolean().optional(),
});

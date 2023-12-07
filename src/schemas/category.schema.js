import { z } from "zod";

export const createCategorySchema = z.object({
  category: z.string({ required_error: "categoria requerida" }),
});

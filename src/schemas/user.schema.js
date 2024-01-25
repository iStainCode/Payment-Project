import { z } from "zod";

export const createUserschema = z.object({
  username: z.string({ required_error: "El username es requerido" }),

  email: z.string({ required_error: "El Email es requerido" }),

  password: z.string({ required_error: "La contraseña es requerida" }),
});
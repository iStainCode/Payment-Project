import { z } from "zod";

export const createProductschema = z.object({
  name: z.string({ required_error: "el nombre del producto es requerido" }),

  price: z.number({ required_error: "el precio del producto es requerido" }),

  description: z.string({
    required_error: "la descripcion del producto es requerida",
  }),

  stock: z.number({ required_error: "el stock del producto es requerido" }),

  category: z.string({ required_error: "la categoria es requerida" }),

  image1: z.string().optional(),

  image2: z.string().optional(),

  active: z
    .boolean({ required_error: "el estado del producto es requerido" })
    .optional(),
});

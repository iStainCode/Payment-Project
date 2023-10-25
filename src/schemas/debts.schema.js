import { z } from "zod";

export const createDebtSchema = z.object({
  name: z.string({
    required_error: "el nombre es requerido",
  }),
  lastname: z.string({
    required_error: "el apellido es requerido",
  }),
  amount: z.number({
    required_error: "el monto es requerido",
  }),
  reason: z
    .string({
      required_error: "la razon es requerida",
    })
    //se puede enviar el parametro como no se puede enviar xq tiene un comportamiendo por default
    .optional(),
  date: z.string().datetime().optional(),
});

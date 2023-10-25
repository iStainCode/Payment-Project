import { z } from "zod";
//squema de registro
export const resgisterSchema = z.object({
  //cuando no se pase el parametro de username devuelve el error
  username: z.string({
    required_error: "el nombre de usuario es requerido",
  }),
  email: z
    .string({
      required_error: "el email es requerido",
    })
    //valida si es un email valido
    .email({
      message: "el email es invalido",
    }),
  password: z
    .string({
      required_error: "la contraseña es requerida",
    })
    //minimo de caracteres
    .min(8, {
      message: "la contraseña tiene que ser como minimo de 8 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "el email es requerido",
    })
    //tiene que ser un email valido ejemplo example@example.com
    .email({
      message: "el email es invalido",
    }),
  password: z
    .string({
      required_error: "la contraseña es requerida",
    })
    .min(8, {
      message: "la contraseña tiene que ser como minimo de 8 caracteres",
    }),
});

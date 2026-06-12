import * as z from 'zod'
 
export const SignupFormSchema = z.object({
  email:z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(6, { message: 'Be at least 6 characters long' }).trim(),
})
 
export type FormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string;
      success?: boolean;
    }
  | undefined


/// FUNCTION FOR LOGIN

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .trim(),

  password: z
    .string()
    .min(1, { message: "Password is required." })
    .trim(),
});

/// FUNTION ITEM FORM
export const ItemFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es obligatorio." })
    .trim(),

  quantity: z.coerce
    .number()
    .int({ message: "La cantidad debe ser un número entero." })
    .min(0, { message: "La cantidad no puede ser negativa." })
    .max(9999, { message: "La cantidad no puede ser mayor a 9999." }),

  price: z.coerce
    .number()
    .min(0, { message: "El precio no puede ser negativo." })
    .default(0),
});

export type ItemFormState =
  | {
      errors?: {
        name?: string[];
        quantity?: string[];
        price?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
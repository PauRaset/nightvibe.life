import { z } from "zod";

const required = { error: "Este campo es obligatorio." };

// Schema compartido por el formulario (cliente) y /api/contacto (servidor).
export const contactSchema = z.object({
  nombre: z
    .string(required)
    .trim()
    .min(2, { error: "Escribe tu nombre." })
    .max(100, { error: "Máximo 100 caracteres." }),
  local: z
    .string(required)
    .trim()
    .min(2, { error: "Escribe el nombre del local." })
    .max(120, { error: "Máximo 120 caracteres." }),
  ciudad: z
    .string(required)
    .trim()
    .min(2, { error: "Escribe la ciudad." })
    .max(80, { error: "Máximo 80 caracteres." }),
  email: z
    .string(required)
    .trim()
    .max(200, { error: "Máximo 200 caracteres." })
    .pipe(z.email({ error: "Escribe un email válido." })),
  telefono: z
    .string(required)
    .trim()
    .regex(/^\+?[0-9\s().-]{9,20}$/, { error: "Escribe un teléfono válido." }),
  mensaje: z
    .string(required)
    .trim()
    .min(10, { error: "Cuéntanos un poco más (mínimo 10 caracteres)." })
    .max(2000, { error: "Máximo 2000 caracteres." }),
  privacidad: z.literal(true, { error: "Debes aceptar la política de privacidad." }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string>>;

/** Nombre del campo trampa anti-spam (invisible para personas). */
export const HONEYPOT_FIELD = "website";

export function flattenErrors(error: z.ZodError): ContactErrors {
  const errors: ContactErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as ContactField | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return errors;
}

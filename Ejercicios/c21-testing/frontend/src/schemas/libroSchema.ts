import { z } from 'zod';

export const libroSchema = z.object({
    titulo: z.string().trim().min(1, 'El título no puede estar vacío.').max(200, 'El título no puede superar 200 caracteres.'),
    autorId: z.coerce.number().int().positive('El autor es obligatorio.'),
    precio: z.coerce.number().int('El precio debe ser un número entero.').positive('El precio debe ser mayor a 0.'),
    imagen: z
        .string()
        .trim()
        .min(1, 'La imagen es obligatoria.')
        .url('Ingresá una URL de imagen válida.')
        .refine(
            (url) => /^https?:\/\//i.test(url),
            'La URL debe comenzar con http:// o https://.',
        ),
    disponible: z.boolean(),
    categoriaIds: z.array(z.number().int().positive()).default([]),
});

export type LibroValidado = z.infer<typeof libroSchema>;

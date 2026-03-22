import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number(),
  category: z.string().optional(),
  inStock: z.boolean().optional(),
});

export const ErrorSchema = z.object({
  error: z.string()
});

import { z } from "zod";

export const categoryschima = z.object({
  name: z.string(),
  description: z.string(),
  images: z.string(),
});

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(["draft", "published", "archived"]),
  price: z.number().refine((val) => val % 1 !== 0, {
    message: "Price must be a floating-point number.",
  }),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.string(),
  isFeatured: z.boolean().optional(),
});

export const pageschema = z.object({
  title: z.string(),
  body: z.string(),
  status: z.string(),
  author: z.string(),
});

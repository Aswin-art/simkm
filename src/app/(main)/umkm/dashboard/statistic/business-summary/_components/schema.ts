import { z } from "zod";

export const lastSalesSchema = z.object({
  id: z.number(),
  product_name: z.string(),
  date: z.string(),
  quantity: z.number(),
  total_price: z.number(),
});

export const productListSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  hpp: z.number(),
  bep: z.number(),
});

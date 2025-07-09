import { z } from "zod";

export const lastSalesSchema = z.object({
  id: z.string(),
  productName: z.string(),
  date: z.string(),
  quantity: z.number(),
  totalPrice: z.number(),
});

export const productListSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  hpp: z.number(),
  bep: z.number(),
});

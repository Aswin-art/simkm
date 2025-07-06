import { z } from "zod";

export const sectionSchema = z.object({
  id: z.number(),
  product_name: z.string(),
  date: z.string(),
  quantity: z.number(),
  total_price: z.number(),
});

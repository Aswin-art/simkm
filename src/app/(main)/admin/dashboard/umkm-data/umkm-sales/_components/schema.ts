import { z } from "zod";

export const sectionSchema = z.object({
  id: z.number(),
  umkm_name: z.string(),
  product_name: z.string(),
  date: z.string(),
  quantity: z.number(),
  total_price: z.number(),
});

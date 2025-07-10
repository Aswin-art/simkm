import { z } from "zod";

export const sectionSchema = z.object({
  id: z.string(),
  productName: z.string(),
  date: z.string(),
  quantity: z.number(),
  totalPrice: z.number(),
});

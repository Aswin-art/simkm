import { z } from "zod";

export const sectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  totalCost: z.number(),
  profitMargin: z.number(),
  hpp: z.number(),
  bep: z.number(),
  totalSales: z.number(),
});

import { z } from "zod";

export const sectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.number(),
  address: z.string(),
  totalSales: z.number(),
  monthlySales: z.number(),
  createdAt: z.string(),
});

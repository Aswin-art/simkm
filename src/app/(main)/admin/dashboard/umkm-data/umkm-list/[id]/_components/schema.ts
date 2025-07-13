import { z } from "zod";

export const sectionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  price: z.number(),
  rawMaterialCost: z.number(),
  totalProduced: z.number(),
  hppPerUnit: z.number(),
  bepUnit: z.number(),
  salesCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

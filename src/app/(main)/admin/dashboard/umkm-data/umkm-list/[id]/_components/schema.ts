import { z } from "zod";

export const sectionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  price: z.number(),
  rawMaterialCost: z.number(),
  laborCost: z.number(),
  overheadCost: z.number(),
  totalCost: z.number(),
  unitProduced: z.number(),
  hppPerUnit: z.number(),
  fixedCost: z.number(),
  variableCostPerUnit: z.number(),
  pricePerUnit: z.number(),
  profitMargin: z.number(),
  bepUnit: z.number(),
  salesCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

import { z } from "zod";

export const sectionSchema = z.object({
  id: z.string(),
  productId: z.string(),
  date: z.string(),
  quantity: z.number(),
  totalPrice: z.number(),
  createdAt: z.string(),
  product: z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    image: z.string().url(),
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
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

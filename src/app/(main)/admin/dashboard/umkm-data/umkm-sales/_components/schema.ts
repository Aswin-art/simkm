import { z } from "zod";

export const sectionSchema = z.object({
  id: z.string(),
  quantity: z.number(),
  totalPrice: z.number(),
  product: z.object({
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
    unitProduced: z.number().int(),
    hppPerUnit: z.number(),
    fixedCost: z.number(),
    variableCostPerUnit: z.number(),
    pricePerUnit: z.number(),
    profitMargin: z.number(),
    bepUnit: z.number(),
    user: z.object({
      name: z.string(),
    }),
  }),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

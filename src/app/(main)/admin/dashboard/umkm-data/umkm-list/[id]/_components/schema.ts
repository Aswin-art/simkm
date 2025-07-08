import { z } from "zod";

export const sectionSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  hpp: z.number(),
  bep: z.number(),
});

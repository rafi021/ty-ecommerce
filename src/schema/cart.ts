import { z } from "zod";

export const CartCreateSchema = z.object({
    productId: z.number(),
    quantity: z.number(),
});

export const ChanageQuantitySchema = z.object({
    quantity: z.number(),
});
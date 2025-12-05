import z from "zod";

export const getProductSchema=z.object({
    metadata:z.string().optional(),
    orderBy:z.enum(['views','seeling','price']).optional(),
    limit:z.string().regex(/^\d+$/).optional()
})
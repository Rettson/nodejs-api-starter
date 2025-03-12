import { z } from "zod";

const create = z.object({
    title: z.string(),
    body: z.string().min(10)
});

export default { create }
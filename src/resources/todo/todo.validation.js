import { z } from "zod";

const create = z.object({
    title: z.string(),
    body: z.string()
});

export default { create }
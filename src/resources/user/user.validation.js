import { z } from "zod";

const register = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
});

const login = z.object({
    email: z.string(),
    password: z.string()
});

export default { register, login }
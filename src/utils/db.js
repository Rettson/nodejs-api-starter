import { createClient } from "@libsql/client";

export const db = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DB_AUTH_TOKEN
});
import token from "#utils/token.js";
import { db } from "#utils/db.js";

export default async function authenticated(req, res, next) {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorised' });
    }

    const access_token = bearer.split('Bearer ')[1].trim();

    const verified = token.verify(access_token);

    console.log(verified);

    if (!verified) {
        return res.status(401).json({ error: 'Unauthorised' });
    }

    const result = await db.execute({
        sql:"SELECT * FROM users WHERE id = ?",
        args: [verified.id]
    });

    console.log(result);
    if (result.rows.length <= 0) {
        return res.status(401).json({ error: 'Unauthorised' });
    }

    req.user = result.rows[0];

    next();
}
import { db } from '#utils/db.js';
import bcrypt from 'bcrypt';
import token from '#utils/token.js';

async function register(req, res, next) {
    const hash = await bcrypt.hash(req.body.password, 12);

    const result = await db.execute({
        sql: "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        args: [req.body.name, req.body.email, hash]
    });

    const userRes = await db.execute({
        sql:"SELECT * FROM users WHERE email = ?",
        args: [req.body.email]
    });

    const user = userRes.rows[0];

    const jwt = await token.create(user.id);

    return res.status(201).json({ token: jwt });
}

async function login(req, res, next) {
    const result = await db.execute({
        sql:"SELECT * FROM users WHERE email = ?",
        args: [req.body.email]
    });

    if (result.rows.length <= 0) {
        return res.status(401).json({ error: 'Unauthorised' });
    }

    const user = result.rows[0];

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPassword) {
        return res.status(401).json({ error: 'Unauthorised' });
    }

    const jwt = await token.create(user.id);

    return res.status(200).json({ token: jwt });
}

async function user(req, res) {
    return res.status(200).json({ user: req.user });
}

export default { register, login, user };
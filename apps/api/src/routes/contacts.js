import { Router } from 'express';
import { query } from '../db.js';


const router = Router();


router.post('/', async (req, res) => {
const { name, email, message } = req.body;
if (!name || !email || !message) return res.status(400).json({ error: 'Invalid' });
const { rows } = await query(
`INSERT INTO contacts (name, email, message) VALUES ($1,$2,$3) RETURNING id;`,
[name, email, message]
);
res.status(201).json({ ok: true, id: rows[0].id });
});


export default router;
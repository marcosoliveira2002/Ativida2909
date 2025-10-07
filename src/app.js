import express from 'express';
import { pool } from './db.js';


const app = express();
app.use(express.json());


app.get('/health', (_req, res) => {
res.json({ ok: true });
});


app.post('/users', async (req, res) => {
try {
const { name, email } = req.body;
if (!name || !email) {
return res.status(400).json({ error: 'name e email são obrigatórios' });
}


const { rows } = await pool.query(
'INSERT INTO users(name, email) VALUES($1, $2) RETURNING id, name, email, created_at',
[name, email]
);


return res.status(201).json(rows[0]);
} catch (err) {
if (err.code === '23505') { // unique_violation
return res.status(409).json({ error: 'email já cadastrado' });
}
console.error(err);
return res.status(500).json({ error: 'internal error' });
}
});


export default app;
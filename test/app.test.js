import request from 'supertest';
import app from '../src/app.js';
import { pool, initDb } from '../src/db.js';


beforeAll(async () => {
await initDb();
});


afterAll(async () => {
await pool.end();
});


describe('API basics', () => {
it('GET /health deve responder ok', async () => {
const res = await request(app).get('/health');
expect(res.status).toBe(200);
expect(res.body.ok).toBe(true);
});


it('POST /users deve inserir usuário', async () => {
const email = `user_${Date.now()}@test.com`;
const res = await request(app)
.post('/users')
.send({ name: 'Marcos', email });


expect(res.status).toBe(201);
expect(res.body).toHaveProperty('id');
expect(res.body.email).toBe(email);
});
});
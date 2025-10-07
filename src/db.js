// src/db.js
import pkg from 'pg';
import dotenv from 'dotenv';


dotenv.config();
const { Pool } = pkg;


export const pool = new Pool({ connectionString: process.env.DATABASE_URL });


// Cria tabela se não existir
export async function initDb() {
await pool.query(`
CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
email TEXT UNIQUE NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
`);
}
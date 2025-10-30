// apps/api/src/db.js
import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // ← pooler URL
  ssl: {
    require: true,             // SSL은 쓰되
    rejectUnauthorized: false, // 인증서 검증은 끈다 (중요)
  },
  connectionTimeoutMillis: 8000,
  idleTimeoutMillis: 30000,
  keepAlive: true,
});

export const query = (text, params) => pool.query(text, params);

import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_URL,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASS,
  port: parseInt(process.env.DATABASE_PORT, 10),
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;

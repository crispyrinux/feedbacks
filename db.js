require('dotenv').config();
const { Pool } = require('pg');


const DB_URL = process.env.DB_URL
// Assuming your .env has PG_CONNECTION_STRING defined
const pool = new Pool({
  connectionString: DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


pool.connect((err) => {
  if (err) {
    console.error('❌ Gagal koneksi ke PostgreSQL:', err);
  } else {
    console.log('✅ Terhubung ke PostgreSQL Neon');
  }
});

module.exports = pool;

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// POST feedback
app.post('/feedback', async (req, res) => {
  const { name, email, problem } = req.body;

  if (!name || !email || !problem) {
    
    return res.status(400).json({ message: 'Semua kolom harus diisi' });
  }

  try {
    await db.query(
      'INSERT INTO feedbacks (name, email, problem) VALUES ($1, $2, $3)',
      [name, email, problem]
    );
    res.status(201).json({ message: 'Feedback berhasil dikirim!' });
  } catch (err) {
    console.error('Gagal menyimpan feedback:', err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});


// GET feedback
app.get('/feedback', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM feedbacks ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Gagal mengambil data feedback:', err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

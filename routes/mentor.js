// routes/mentor.js
import express from 'express';
import db from '../database.js';

const router = express.Router();

// Add mentor
router.post('/add', (req, res) => {
  const mentor = req.body;
  const { name, expertise } = mentor; // Example fields

  const insertQuery = 'INSERT INTO mentors (name, expertise) VALUES (?, ?)';
  db.query(insertQuery, [name, expertise], (err, result) => {
    if (err) {
      console.error('Mentor जोड़ने में एरर:', err);
      return res.status(500).json({ error: 'डेटाबेस में सेव नहीं हुआ' });
    }
    res.status(200).json({ message: 'Mentor सफलतापूर्वक सेव हो गया!' });
  });
});

// GET all mentors
router.get('/', (req, res) => {
  db.query('SELECT * FROM mentors', (err, results) => {
    if (err) {
      console.error('Error fetching mentors:', err);
      return res.status(500).json({ error: 'Failed to fetch mentors' });
    }
    res.status(200).json(results);
  });
});

export default router;

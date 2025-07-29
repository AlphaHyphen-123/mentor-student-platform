const express = require('express');
const router = express.Router();
const mentorModel = require('../models/mentorModel');

router.post('/add', (req, res) => {
  const mentor = req.body;

  mentorModel.addMentor(mentor, (err, result) => {
    if (err) {
      console.error('Mentor जोड़ने में एरर:', err);
      return res.status(500).json({ error: 'डेटाबेस में सेव नहीं हुआ' });
    }
    res.status(200).json({ message: 'Mentor सफलतापूर्वक सेव हो गया!' });
  });
});

module.exports = router;

const db = require('../database');  // Add this if not already added

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

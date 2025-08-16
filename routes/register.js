// routes/register.js
import express from 'express';
import db from '../database.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { fullname, email, password, role } = req.body;

  if (!fullname || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const baseId = role === 'junior' ? 100 : 200;

  const getMaxIdQuery = 'SELECT MAX(id) AS maxId FROM users WHERE role = ?';
  db.query(getMaxIdQuery, [role], (err, result) => {
    if (err) {
      console.error('Error fetching max ID:', err);
      return res.status(500).json({ message: 'Server error while assigning ID.' });
    }

    const maxId = result[0].maxId || (baseId - 1);
    const newId = maxId + 1;

    const insertQuery = 'INSERT INTO users (id, fullname, email, password, role) VALUES (?, ?, ?, ?, ?)';
    db.query(insertQuery, [newId, fullname, email, password, role], (err, result) => {
      if (err) {
        console.error('Error while inserting data:', err);
        return res.status(500).json({ message: 'Something went wrong, please try again later.' });
      }
      res.status(200).json({ message: 'Registration successful!', id: newId });
    });
  });
});

export default router;

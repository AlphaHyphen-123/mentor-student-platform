// routes/login.js
import express from 'express';
import db from '../database.js'; // ES Module import

const router = express.Router();

router.post('/', (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password aur role sab chahiye' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ? AND role = ?';
  db.query(query, [email, password, role], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length > 0) {
      const user = results[0];
      res.status(200).json({
        message: 'Login successful!',
        id: user.id,
        name: user.fullname,
        role: user.role,
        email: user.email
      });
    } else {
      res.status(401).json({ message: 'Invalid email, password, or role' });
    }
  });
});

export default router; // ✅ ES Module export

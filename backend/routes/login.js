const express = require('express');
const router = express.Router();
const db = require('../database');  // database connection

router.post('/', (req, res) => {
  const { email, password, role } = req.body;  // role bhi destructure karo

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password aur role sab chahiye' });
  }

  // SQL query mein role bhi check karo
  const query = 'SELECT * FROM users WHERE email = ? AND password = ? AND role = ?';

  db.query(query, [email, password, role], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length > 0) {
      // User mila hai, login successful
      const user = results[0];
      res.status(200).json({ 
        message: 'Login successful!',
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email
      });
    } else {
      // Email-password-role match nahi hua
      res.status(401).json({ message: 'Invalid email, password, or role' });
    }
  });
});

module.exports = router;

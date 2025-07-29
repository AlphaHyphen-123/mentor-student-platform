const db = require('../database');

const createUser = (user, callback) => {
  const sql = `INSERT INTO users (fullName, email, password, role) VALUES (?, ?, ?, ?)`;
  db.query(sql, [user.fullName, user.email, user.password, user.role], callback);
};

module.exports = { createUser };

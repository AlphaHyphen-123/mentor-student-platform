const db = require('../database');

function addMentor(mentor, callback) {
  const sql = `INSERT INTO mentors (name, role, company, technologies, image) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [mentor.name, mentor.role, mentor.company, mentor.technologies, mentor.image], callback);
}

module.exports = { addMentor };

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'apna_password_yahan_likhein',
  database: 'mentor_platform'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL से कनेक्ट हो गया!');
});

module.exports = connection;

// database.js
import mysql from 'mysql';

// MySQL database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Shivam@123', // update with your password
  database: 'mentorshipDB' // make sure this DB exists
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('❌ MySQL Connection Error:', err.message);
    return;
  }
  console.log('✅ MySQL Connected to mentorshipDB');
});

// Export the db connection (ES Module syntax)
export default db;

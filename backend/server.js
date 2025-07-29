const express = require('express');
const app = express();
const cors = require('cors');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');

const mentorRoute = require('./routes/mentor'); 

app.use(cors());
app.use(express.json());

// Note: Routes with correct prefixes
app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/mentors', mentorRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

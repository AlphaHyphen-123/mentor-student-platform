import express from 'express';
import cors from 'cors';

import registerRoute from './routes/register.js';
import loginRoute from './routes/login.js';
import mentorRoute from './routes/mentor.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/mentors', mentorRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import registerRoute from './routes/register.js';
import loginRoute from './routes/login.js';
import mentorRoute from './routes/mentor.js';

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/mentors', mentorRoute);

// __dirname setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files for all frontend folders
app.use(express.static(path.join(__dirname)));

// Default route → Home.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'HomePage', 'Home.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

import express from 'express';
import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';
import scoresRouter from './src/routes/scores.js';
import cors from 'cors';

// Enable CORS for all requests


// Necessary to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080; // Hardcoded port
const mongoUri = 'mongodb://localhost:27017'; // Hardcoded MongoDB URI
app.use(cors());
// Middleware for parsing JSON
app.use(express.json());

// Serve static files (if any)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB client
let db;

// Connect to MongoDB
MongoClient.connect(mongoUri, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
  db = client.db('scoresdb'); // Database name: scoresdb
  console.log('Connected to MongoDB');
  
  // Pass the MongoDB instance to the scores router
  app.use('/api/scores', (req, res, next) => {
    req.db = db;
    next();
  }, scoresRouter);

  // Start the server
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
  });
});

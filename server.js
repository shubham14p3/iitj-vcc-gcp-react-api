var express = require('express');
var path = require('path');
var { MongoClient } = require('mongodb');
var app = express();

app.use(express.json()); // Middleware for parsing JSON bodies
app.use(express.static(path.join(__dirname)));

// MongoDB setup
const mongoUrl = 'mongodb://localhost:27017'; // Change this if you're using MongoDB Atlas
const dbName = 'gameScoresDB';
let db;

// Connect to MongoDB
MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);
  })
  .catch((error) => console.error(error));

// API Routes for handling scores
app.get('/api/scores', async (req, res) => {
  try {
    const scoresCollection = db.collection('scores');
    const scores = await scoresCollection.find({}).toArray();
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: 'Error reading scores from database' });
  }
});

app.post('/api/scores', async (req, res) => {
  const { name, score } = req.body;
  if (!name || !score) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const scoresCollection = db.collection('scores');
    await scoresCollection.insertOne({ user: name, score });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error saving score to database' });
  }
});

// Fallback to index.html for other routes (for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(`Server running on port ${app.get('port')}`);
});

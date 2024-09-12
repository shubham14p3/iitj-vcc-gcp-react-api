var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
app.use(express.json()); // Middleware for parsing JSON bodies

// Serve static files
app.use(express.static(path.join(__dirname)));

// API Routes for handling scores
const scoresFile = path.join(__dirname, 'scores.json');
app.get('/api/scores', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(scoresFile));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error reading scores file' });
  }
});

app.post('/api/scores', (req, res) => {
  const { name, score } = req.body;
  if (!name || !score) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    let scores = JSON.parse(fs.readFileSync(scoresFile));
    scores.push({ user: name, score });
    fs.writeFileSync(scoresFile, JSON.stringify(scores, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error saving score' });
  }
});

// Fallback to index.html for other routes (for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});

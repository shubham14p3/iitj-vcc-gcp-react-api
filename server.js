app.post('/api/scores', async (req, res) => {
  const { name, score } = req.body;
  const response = await API.postScores(name, score);
  res.json(response);
});

app.get('/api/scores', async (req, res) => {
  const response = await API.getScores();
  res.json(response);
});

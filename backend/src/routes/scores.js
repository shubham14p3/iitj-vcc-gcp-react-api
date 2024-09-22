import express from 'express';
const router = express.Router();

// GET: Retrieve all scores
router.get('/', async (req, res) => {
  try {
    const scores = await req.db.collection('scores').find().toArray();
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching scores from MongoDB' });
  }
});

// POST: Add a new score
router.post('/', async (req, res) => {
  const { user, score } = req.body; // Use 'user' instead of 'name'
  
  if (!user || typeof score !== 'number') { // Add validation for score to be a number
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    await req.db.collection('scores').insertOne({ user, score });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error saving score to MongoDB' });
  }
});

export default router;

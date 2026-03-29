import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const REVIEWS_FILE = path.join(__dirname, 'data', 'reviews.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

app.post('/api/reviews', (req, res) => {
  let reviews = [];
  
  if (fs.existsSync(REVIEWS_FILE)) {
    try {
      const data = fs.readFileSync(REVIEWS_FILE, 'utf8');
      reviews = JSON.parse(data);
    } catch (err) {
      console.error('Error reading reviews file:', err);
    }
  }

  reviews.push(req.body);

  try {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
    res.status(201).json({ message: 'Review saved' });
  } catch (err) {
    console.error('Error writing reviews file:', err);
    res.status(500).json({ error: 'Failed to save review' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Review server running on http://localhost:${PORT}`);
});

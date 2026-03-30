import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');
const LEADERBOARD_FILE = path.join(DATA_DIR, 'leaderboard.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

function readJSON(file) {
  if (!fs.existsSync(file)) return [];
  try {
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeJSON(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
    return false;
  }
}

// ─── Reviews ───────
app.get('/api/reviews', (req, res) => {
  const reviews = readJSON(REVIEWS_FILE);
  // Anonymize reviews: only first_name, occupation, text, concepts_count
  const anon = reviews.map(r => ({
    first_name: r.name ? r.name.split(' ')[0] : 'Anonymous',
    occupation: r.occupation || 'Learner',
    review_text: r.review_text,
    concepts_seen_count: r.concepts_seen_count || 10,
    submitted_at: r.submitted_at
  }));
  res.json(anon);
});

app.post('/api/reviews', (req, res) => {
  const reviews = readJSON(REVIEWS_FILE);
  reviews.push({ ...req.body, submitted_at: new Date().toISOString() });
  if (writeJSON(REVIEWS_FILE, reviews)) {
    res.status(201).json({ message: 'Review saved' });
  } else {
    res.status(500).json({ error: 'Failed to save review' });
  }
});

// ─── Support Status ───────
app.get('/api/support-status', (req, res) => {
  const { email } = req.query;
  const reviews = readJSON(REVIEWS_FILE);
  const completed = reviews.some(r => r.email === email);
  res.json({ completed });
});

// ─── Leaderboard ───────
app.post('/api/leaderboard/submit', (req, res) => {
  const { name, email, occupation, concepts_passed, domains_completed, streak, opted_in } = req.body;
  if (!opted_in) return res.status(400).json({ error: 'User did not opt in' });

  let leaderboard = readJSON(LEADERBOARD_FILE);
  const entryIndex = leaderboard.findIndex(e => e.email === email);

  const entry = {
    name: name.split(' ')[0], // only first name
    email, // stored for upserting, filtered on GET
    occupation: occupation || 'Learner',
    concepts_passed,
    domains_completed,
    streak: streak || 0,
    last_updated: new Date().toISOString()
  };

  if (entryIndex >= 0) {
    leaderboard[entryIndex] = entry;
  } else {
    leaderboard.push(entry);
  }

  if (writeJSON(LEADERBOARD_FILE, leaderboard)) {
    res.status(200).json({ message: 'Stats updated' });
  } else {
    res.status(500).json({ error: 'Failed to update leaderboard' });
  }
});

app.get('/api/leaderboard', (req, res) => {
  const leaderboard = readJSON(LEADERBOARD_FILE);
  const sorted = leaderboard
    .sort((a, b) => b.concepts_passed - a.concepts_passed)
    .slice(0, 50)
    .map((e, i) => ({
      rank: i + 1,
      name: e.name,
      occupation: e.occupation,
      concepts_passed: e.concepts_passed,
      domains_completed: e.domains_completed,
      streak: e.streak
    }));
  res.json(sorted);
});

app.post('/api/leaderboard/opt-out', (req, res) => {
  const { email } = req.body;
  let leaderboard = readJSON(LEADERBOARD_FILE);
  leaderboard = leaderboard.filter(e => e.email !== email);
  if (writeJSON(LEADERBOARD_FILE, leaderboard)) {
    res.json({ message: 'Removed from leaderboard' });
  } else {
    res.status(500).json({ error: 'Failed to remove' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

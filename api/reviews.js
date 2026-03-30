// Vercel Serverless Function: api/reviews.js

// Mock storage for demo purposes (persistent only within the same cold-start instance)
const REVIEWS = [
  {
    name: "Emmanuel Ekundayo",
    email: "emma@example.com",
    phone: "1234567890",
    occupation: "Senior Software Engineer",
    review_text: "Learn Blazingly Fast has completely changed how I look at complex algorithms. The visualizations are top-tier and the playground is a game-changer for quick experimentation. Highly recommended for any serious developer.",
    concepts_seen: ["Binary Search", "DFS", "BFS"],
    submitted_at: new Date().toISOString()
  },
  {
    name: "Sarah Chen",
    email: "sarah@edu.com",
    phone: "0987654321",
    occupation: "CS Student",
    review_text: "I was struggling with Dynamic Programming for months until I found this platform. The step-by-step visualizations for the Knapsack problem made everything click instantly. The UI is also stunningly beautiful!",
    concepts_seen: ["Knapsack DP", "Merge Sort"],
    submitted_at: new Date().toISOString()
  },
  {
    name: "Alex Rivera",
    email: "alex@tech.io",
    phone: "1122334455",
    occupation: "Frontend Developer",
    review_text: "As someone who focuses on UI, I'm blown away by the level of polish here. The Playground with its different modes is something I haven't seen anywhere else. It's not just a learning tool, it's a piece of art.",
    concepts_seen: ["Quick Sort", "Trie"],
    submitted_at: new Date().toISOString()
  }
];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const review = req.body;
    
    // Store internally (mock)
    REVIEWS.push({
      ...review,
      submitted_at: new Date().toISOString()
    });

    console.log('--- NEW REVIEW RECEIVED ---');
    console.log(JSON.stringify(review, null, 2));
    console.log('---------------------------');

    return res.status(201).json({ 
      message: 'Review received and logged.',
      status: 'success'
    });
  } else if (req.method === 'GET') {
    // Return ANONYMIZED data
    const publicReviews = REVIEWS.map(r => ({
      first_name: r.name.split(' ')[0],
      occupation: r.occupation,
      review_text: r.review_text,
      submitted_at: r.submitted_at,
      concepts_seen_count: r.concepts_seen?.length || 0
    }));

    return res.status(200).json(publicReviews);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

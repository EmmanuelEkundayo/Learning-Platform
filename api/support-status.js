// Vercel Serverless Function: api/support-status.js

// Mock storage for demo purposes
// In production, this would be a database like Supabase or MongoDB
const COMPLETED_EMAILS = new Set();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: 'Email parameter is required' });
    }
    
    return res.status(200).json({ 
      completed: COMPLETED_EMAILS.has(email.toLowerCase()) 
    });
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

// Helper to add email from other functions (if they run in same instance)
export function markEmailCompleted(email) {
  if (email) COMPLETED_EMAILS.add(email.toLowerCase());
}

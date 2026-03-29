// Vercel Serverless Function: api/reviews.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const review = req.body;
    
    // LOGGING: On Vercel, this will show up in the Function Logs dashboard.
    // Filesystem writing (fs.writeFileSync) is NOT supported on Vercel's read-only environment.
    console.log('--- NEW REVIEW RECEIVED ---');
    console.log(JSON.stringify(review, null, 2));
    console.log('---------------------------');

    // To persist this properly, you would connect a database here (e.g., Supabase, MongoDB, etc.)
    // For now, we return a success status so the frontend continues.
    return res.status(201).json({ 
      message: 'Review received and logged. Note: Vercel filesystem is read-only; use a database for persistence.',
      status: 'success'
    });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

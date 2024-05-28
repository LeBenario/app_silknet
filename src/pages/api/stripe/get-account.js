import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { accountId } = req.body;

    if (!accountId) {
      return res.status(400).json({ error: 'Account ID is required' });
    }

    try {
      const account = await stripe.accounts.retrieve(accountId);
      res.status(200).json({ account });
    } catch (error) {
      console.error('Error retrieving Stripe account:', error);
      res.status(500).json({ error: 'Error retrieving Stripe account', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

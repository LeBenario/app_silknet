import Stripe from 'stripe';
import pool from '../db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body; // Assume email is passed in the body

      // Create a new Stripe account
      const account = await stripe.accounts.create({ type: 'standard' });

      // Store the Stripe account ID in your database
      await pool.query('UPDATE users SET stripeAccountId = $1 WHERE email = $2', [account.id, email]);

      // Create an account link for onboarding
      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: 'https://your-website.com/reauth',
        return_url: 'https://your-website.com/register',
        type: 'account_onboarding',
      });

      res.status(200).json({ url: accountLink.url });
    } catch (error) {
      console.error('Error creating Stripe account:', error);
      res.status(500).json({ error: 'Error creating Stripe account', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

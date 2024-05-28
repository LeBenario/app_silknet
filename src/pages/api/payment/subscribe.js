import pool from '../db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, token } = req.body;
    // Vérification du token de paiement via Stripe ou autre service
    const paymentVerified = true; // Cette vérification doit être réelle
    if (paymentVerified) {
      try {
        await pool.query("UPDATE users SET paid = $1 WHERE id = $2", [true, userId]);
        res.status(200).json({ message: 'Payment successful' });
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'abonnement', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'abonnement' });
      }
    } else {
      res.status(400).json({ error: 'Payment failed' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}

import jwt from 'jsonwebtoken';
import pool from '../db';
import { comparePassword } from '../../../utils/passwordUtils';

const secret = process.env.JWT_KEY || 'your-secret-key';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
      if (user && await comparePassword(password, user.password)) {
        const token = jwt.sign({ userId: user.id, email: user.email }, secret, { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
      res.status(500).json({ error: 'Erreur lors de la connexion', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}

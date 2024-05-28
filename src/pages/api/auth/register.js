import pool from '../db';
import { hashPassword } from '../../../utils/passwordUtils';
import { generateToken } from '../../../utils/authUtils';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, pseudo } = req.body;
    try {
      // Hash the password
      const hashedPassword = await hashPassword(password);
      
      // Generate a new UUID for the user
      const userId = uuidv4();
      
      // Insert the new user into the database
      const result = await pool.query(
        'INSERT INTO users (id, email, password, pseudo) VALUES ($1, $2, $3, $4) RETURNING id',
        [userId, email, hashedPassword, pseudo]
      );
      
      // Generate a token for the user
      const token = generateToken({ userId, email });
      
      // Respond with the generated token and a 201 status code
      res.status(201).json({ token });
    } catch (error) {
      console.error('Erreur lors de l\'inscription', error);
      res.status(500).json({ error: 'Erreur lors de l\'inscription', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}

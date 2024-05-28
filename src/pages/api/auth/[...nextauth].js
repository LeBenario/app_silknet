import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import pool from '../db'; // Ajustez le chemin selon votre configuration
import { comparePassword } from '../../../utils/passwordUtils'; // Ajustez le chemin selon votre configuration

const secret = process.env.JWT_KEY || 'your-secret-key';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        try {
          const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
          const user = result.rows[0];
          if (user && await comparePassword(password, user.password)) {
            return { id: user.id, email: user.email, pseudo: user.pseudo }; // Retourne l'utilisateur sans le token
          } else {
            return null;
          }
        } catch (error) {
          console.error('Erreur lors de la connexion', error);
          return null;
        }
      }
    }),
  ],
  secret,
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    }
  }
});

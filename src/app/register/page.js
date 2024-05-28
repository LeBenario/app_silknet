"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../auth.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', { email, password, pseudo });
      if (response.status === 201) {
        // Rediriger vers la page de connexion après l'inscription réussie
        router.push('/login');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription', error); // Pas besoin d'échapper manuellement
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div className="register-container">
      <form className='form' onSubmit={handleSubmit}>
        <h3>Inscription</h3>
        <div>
          <label>Nom ou nom d&apos;entreprise</label>
          <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Mot de passe</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn-secondary">Inscription</button>
        <button type="button" className="btn-secondary" onClick={handleLoginRedirect}>
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Register;

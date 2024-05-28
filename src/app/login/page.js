"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import '../auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      console.error('Erreur lors de la connexion', result.error);
    } else {
      router.push('/');
    }
  };

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  return (
    <div className="login-container">
      <form className='form' onSubmit={handleSubmit}>
        <h3>Login</h3>
        <div>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            id="password"
            required
          />
        </div>
        <button type="submit" className="btn-secondary">Se connecter</button>
        <button type="button" className="btn-secondary" onClick={handleRegisterRedirect}>
          S&apos;inscrire
        </button>
      </form>
    </div>
  );
};

export default Login;

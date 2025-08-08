import { useState } from 'react';
import { signin } from '../services/authService';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await signin({ email, password });
      const token = response.data;
      localStorage.setItem('token', token);
      alert('Sign in successful!');
      // Optionally redirect here
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          autoComplete="username"
          onChange={e => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Sign In</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}
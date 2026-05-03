import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-eyebrow">get started</div>
        <h1 className="auth-title">Create Account</h1>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Full Name</label>
            <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="auth-field">
            <label>Email</label>
            <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required minLength={6} />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Creating…' : 'Create Account →'}
          </button>
        </form>
        <p className="auth-switch">Have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  );
}
export default Register;
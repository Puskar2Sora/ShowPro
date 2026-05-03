import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/AddProject.css';

function AddProject() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', techStack: '', githubLink: '', liveLink: '', imageUrl: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add project');
    } finally { setLoading(false); }
  };

  if (!token) return (
    <div className="ap-page">
      <div className="ap-card"><p className="ap-empty">Please login to add a project.</p></div>
    </div>
  );

  return (
    <div className="ap-page">
      <div className="ap-card">
        <div className="ap-eyebrow">new project</div>
        <h1 className="ap-title">Add Project</h1>
        {error && <div className="ap-error">{error}</div>}
        <form onSubmit={handleSubmit} className="ap-form">
          {[
            { name: 'title', label: 'Project Title', type: 'text', placeholder: 'My Awesome Project', required: true },
            { name: 'techStack', label: 'Tech Stack (comma separated)', type: 'text', placeholder: 'React, Node.js, MongoDB', required: true },
            { name: 'githubLink', label: 'GitHub Link', type: 'url', placeholder: 'https://github.com/user/repo', required: true },
            { name: 'liveLink', label: 'Live Demo (optional)', type: 'url', placeholder: 'https://myproject.com' },
            { name: 'imageUrl', label: 'Image URL (optional)', type: 'url', placeholder: 'https://example.com/image.png' },
          ].map(f => (
            <div className="ap-field" key={f.name}>
              <label>{f.label}</label>
              <input type={f.type} name={f.name} placeholder={f.placeholder} value={formData[f.name]} onChange={handleChange} required={f.required} />
            </div>
          ))}
          <div className="ap-field">
            <label>Description</label>
            <textarea name="description" placeholder="What does your project do?" value={formData.description} onChange={handleChange} required rows={4} />
          </div>
          <button type="submit" className="ap-btn" disabled={loading}>
            {loading ? 'Publishing…' : 'Publish Project →'}
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddProject;

// valoi bol 
// aka aka korchis
// amay bollio na akbaro
// kelabo janis to
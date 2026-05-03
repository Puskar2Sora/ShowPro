// src/pages/Profile.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Profile.css';

function Profile() {
  const { id } = useParams();
  const { user, token } = useAuth();

  const [profileUser, setProfileUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, projectsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/users/${id}`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/projects/user/${id}`)
        ]);
        setProfileUser(userRes.data);
        setProjects(projectsRes.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async (projectId) => {
    if (!window.confirm('Delete this project?')) return;
    setDeletingId(projectId);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProjects(prev => prev.filter(p => p._id !== projectId));
    } catch {
      alert('Failed to delete project');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="pf-loading">
        <div className="pf-loading-bar" />
        <span>Loading profile</span>
      </div>
    );
  }

  if (!profileUser) {
    return <div className="pf-loading">User not found.</div>;
  }

  const isOwnProfile = user && user.id?.toString() === id;
  const allTechs = ['All', ...new Set(projects.flatMap(p => p.techStack))];
  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.techStack.includes(activeFilter));

  const totalLikes = projects.reduce((acc, p) => acc + (p.likes?.length || 0), 0);
  const joinDate = new Date(profileUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="pf-root">

      {/* ── Hero Banner ── */}
      <div className="pf-hero">
        <div className="pf-hero-noise" />
        <div className="pf-hero-grid" />

        <div className="pf-hero-inner">
          {/* Avatar */}
          <div className="pf-avatar-wrap">
            <div className="pf-avatar">
              {profileUser.name.charAt(0).toUpperCase()}
            </div>
            {isOwnProfile && <div className="pf-avatar-ring" />}
          </div>

          {/* Identity */}
          <div className="pf-identity">
            <div className="pf-name-row">
              <h1 className="pf-name">{profileUser.name}</h1>
              {isOwnProfile && <span className="pf-you-badge">you</span>}
            </div>
            <p className="pf-email">{profileUser.email}</p>
            {profileUser.bio
              ? <p className="pf-bio">{profileUser.bio}</p>
              : isOwnProfile && <p className="pf-bio pf-bio-empty">No bio yet — add one to stand out.</p>
            }
          </div>

          {/* Stats row */}
          <div className="pf-stats">
            <div className="pf-stat">
              <span className="pf-stat-num">{projects.length}</span>
              <span className="pf-stat-lbl">Projects</span>
            </div>
            <div className="pf-stat-divider" />
            <div className="pf-stat">
              <span className="pf-stat-num">{totalLikes}</span>
              <span className="pf-stat-lbl">Total likes</span>
            </div>
            <div className="pf-stat-divider" />
            <div className="pf-stat">
              <span className="pf-stat-num">{allTechs.length - 1}</span>
              <span className="pf-stat-lbl">Technologies</span>
            </div>
            <div className="pf-stat-divider" />
            <div className="pf-stat">
              <span className="pf-stat-num pf-stat-date">{joinDate}</span>
              <span className="pf-stat-lbl">Joined</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Projects Section ── */}
      <div className="pf-body">

        {/* Section header */}
        <div className="pf-section-header">
          <div className="pf-section-left">
            <span className="pf-section-eyebrow">portfolio</span>
            <h2 className="pf-section-title">
              {isOwnProfile ? 'My Work' : `${profileUser.name.split(' ')[0]}'s Work`}
            </h2>
          </div>
          <span className="pf-project-count">{filtered.length} shown</span>
        </div>

        {/* Tech filter pills */}
        {allTechs.length > 1 && (
          <div className="pf-filters">
            {allTechs.map(tech => (
              <button
                key={tech}
                className={`pf-filter-pill ${activeFilter === tech ? 'active' : ''}`}
                onClick={() => setActiveFilter(tech)}
              >
                {tech}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="pf-empty">
            <div className="pf-empty-icon">◎</div>
            <p>No projects yet.</p>
            {isOwnProfile && <p className="pf-empty-sub">Add your first project to get started.</p>}
          </div>
        ) : (
          <div className="pf-grid">
            {filtered.map((project, idx) => (
              <ProjectCard
                key={project._id}
                project={project}
                isOwn={isOwnProfile}
                onDelete={handleDelete}
                isDeleting={deletingId === project._id}
                index={idx}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, isOwn, onDelete, isDeleting, index }) {
  const [hovered, setHovered] = useState(false);

  const colorSeed = project.title.charCodeAt(0) % 5;
  const accentColors = ['#6ee7b7', '#93c5fd', '#f9a8d4', '#fcd34d', '#a5b4fc'];
  const accent = accentColors[colorSeed];

  return (
    <div
      className={`pf-card ${isDeleting ? 'pf-card-deleting' : ''}`}
      style={{ '--accent': accent, '--idx': index }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <div className="pf-card-accent-line" />

      {/* Card header */}
      <div className="pf-card-header">
        <div className="pf-card-index">#{String(index + 1).padStart(2, '0')}</div>
        {isOwn && (
          <button
            className="pf-delete-btn"
            onClick={() => onDelete(project._id)}
            disabled={isDeleting}
            title="Delete project"
          >
            {isDeleting ? '…' : '×'}
          </button>
        )}
      </div>

      {/* Project image */}
      {project.imageUrl && (
        <div className="pf-card-img-wrap">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="pf-card-img"
            onError={e => { e.target.parentElement.style.display = 'none'; }}
          />
        </div>
      )}

      {/* Content */}
      <div className="pf-card-body">
        <h3 className="pf-card-title">{project.title}</h3>
        <p className="pf-card-desc">{project.description}</p>
      </div>

      {/* Tech stack */}
      <div className="pf-card-tags">
        {project.techStack.map((tech, i) => (
          <span key={i} className="pf-tag">{tech}</span>
        ))}
      </div>

      {/* Footer */}
      <div className="pf-card-footer">
        <div className="pf-card-links">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noreferrer" className="pf-link pf-link-gh">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noreferrer" className="pf-link pf-link-live">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Live
            </a>
          )}
        </div>
        <div className="pf-card-likes">
          <span className="pf-heart">♥</span>
          {project.likes?.length || 0}
        </div>
      </div>
    </div>
  );
}

export default Profile;
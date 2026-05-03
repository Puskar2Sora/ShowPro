import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const FILTER_TYPES = ['All', 'Title', 'Username', 'Tech Stack'];
const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Most Liked', value: 'liked' },
  { label: 'A → Z', value: 'az' },
  { label: 'Z → A', value: 'za' },
];

const S = {
  page: { maxWidth: 1100, margin: '0 auto', padding: '48px 24px', fontFamily: "'Outfit', sans-serif", color: '#e8e6e0' },
  header: { textAlign: 'center', marginBottom: 40 },
  eyebrow: { fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6ee7b7', marginBottom: 8 },
  title: { fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 400, color: '#f0ede6', letterSpacing: '-0.03em', margin: '0 0 8px' },
  sub: { color: '#333', fontFamily: "'DM Mono', monospace", fontSize: '0.8rem', letterSpacing: '0.04em' },
  searchWrap: { maxWidth: 600, margin: '0 auto 12px', display: 'flex', gap: 10 },
  input: { flex: 1, padding: '11px 18px', background: '#0e0e0e', border: '1px solid #222', borderRadius: 3, color: '#e8e6e0', fontSize: '0.92rem', fontFamily: "'Outfit', sans-serif", outline: 'none' },
  filterToggle: (active) => ({ padding: '11px 18px', background: active ? 'rgba(110,231,183,.1)' : '#0e0e0e', border: `1px solid ${active ? 'rgba(110,231,183,.3)' : '#222'}`, borderRadius: 3, color: active ? '#6ee7b7' : '#444', fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.06em', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s' }),
  panel: { maxWidth: 600, margin: '0 auto 24px', background: '#0e0e0e', border: '1px solid #1e1e1e', borderRadius: 4, padding: 20 },
  panelLabel: { fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#333', marginBottom: 10 },
  pillRow: { display: 'flex', gap: 7, flexWrap: 'wrap' },
  pill: (active, color) => ({ padding: '5px 13px', borderRadius: 3, border: `1px solid ${active ? (color || 'rgba(110,231,183,.3)') : '#222'}`, fontSize: '0.75rem', fontFamily: "'DM Mono', monospace", cursor: 'pointer', background: active ? (color ? color + '20' : 'rgba(110,231,183,.08)') : 'transparent', color: active ? (color || '#6ee7b7') : '#444', transition: 'all 0.15s' }),
  activeTags: { maxWidth: 600, margin: '0 auto 14px', display: 'flex', gap: 7, flexWrap: 'wrap' },
  activeTag: { fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', background: 'rgba(110,231,183,.08)', color: '#6ee7b7', border: '1px solid rgba(110,231,183,.2)', padding: '3px 10px', borderRadius: 20, cursor: 'pointer' },
  resultCount: { maxWidth: 600, margin: '0 auto 20px', fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', color: '#2a2a2a', letterSpacing: '0.04em' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1px', background: '#161616', border: '1px solid #161616', borderRadius: 4, overflow: 'hidden' },
  emptyWrap: { textAlign: 'center', padding: '80px 20px', color: '#333' },
  clearBtn: { marginTop: 12, background: 'none', color: '#6ee7b7', border: 'none', cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: '0.78rem', letterSpacing: '0.06em' },
};

function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const { user, token } = useAuth();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then(res => { setProjects(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const allTechs = [...new Set(projects.flatMap(p => p.techStack.map(t => t.trim())))].sort();
  const toggleTech = tech => setSelectedTechs(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]);
  const clearAll = () => { setSearchQuery(''); setActiveFilter('All'); setSortBy('newest'); setSelectedTechs([]); };
  const hasActive = searchQuery || activeFilter !== 'All' || sortBy !== 'newest' || selectedTechs.length > 0;

  let filtered = projects.filter(p => {
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const checks = { Title: p.title.toLowerCase().includes(q), Username: p.user?.name?.toLowerCase().includes(q), 'Tech Stack': p.techStack.some(t => t.toLowerCase().includes(q)) };
      if (activeFilter !== 'All' && !checks[activeFilter]) return false;
      if (activeFilter === 'All' && !Object.values(checks).some(Boolean)) return false;
    }
    if (selectedTechs.length > 0) {
      const pt = p.techStack.map(t => t.toLowerCase());
      if (!selectedTechs.every(t => pt.includes(t.toLowerCase()))) return false;
    }
    return true;
  });

  filtered = [...filtered].sort((a, b) => ({
    oldest: new Date(a.createdAt) - new Date(b.createdAt),
    liked: b.likes.length - a.likes.length,
    az: a.title.localeCompare(b.title),
    za: b.title.localeCompare(a.title),
  }[sortBy] ?? new Date(b.createdAt) - new Date(a.createdAt)));

  const handleLike = async (projectId) => {
    if (!user) { alert('Please login to like projects!'); return; }
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}/like`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setProjects(projects.map(p => p._id === projectId ? { ...p, likes: Array(res.data.likes).fill(null) } : p));
    } catch (err) { console.error(err); }
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px 20px', color: '#333', fontFamily: "'DM Mono', monospace", fontSize: '0.8rem', letterSpacing: '0.1em' }}>
      Loading projects…
    </div>
  );

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <div style={S.page}>
        <div style={S.header}>
          <div style={S.eyebrow}>discover</div>
          <h1 style={S.title}>All Projects</h1>
          <p style={S.sub}>{projects.length} projects from developers worldwide</p>
        </div>

        <div style={S.searchWrap}>
          <input
            style={S.input}
            type="text"
            placeholder={activeFilter === 'Username' ? 'Search by username…' : activeFilter === 'Tech Stack' ? 'Search by tech…' : activeFilter === 'Title' ? 'Search by title…' : 'Search anything…'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button style={S.filterToggle(showFilters)} onClick={() => setShowFilters(!showFilters)}>
            Filters {hasActive ? '●' : ''}
          </button>
        </div>

        {showFilters && (
          <div style={S.panel}>
            <div style={{ marginBottom: 18 }}>
              <p style={S.panelLabel}>Search in</p>
              <div style={S.pillRow}>
                {FILTER_TYPES.map(f => <button key={f} style={S.pill(activeFilter === f)} onClick={() => setActiveFilter(f)}>{f}</button>)}
              </div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <p style={S.panelLabel}>Sort by</p>
              <div style={S.pillRow}>
                {SORT_OPTIONS.map(o => <button key={o.value} style={S.pill(sortBy === o.value, '#0d9488')} onClick={() => setSortBy(o.value)}>{o.label}</button>)}
              </div>
            </div>
            <div style={{ marginBottom: hasActive ? 16 : 0 }}>
              <p style={S.panelLabel}>Filter by tech</p>
              <div style={S.pillRow}>
                {allTechs.map(t => <button key={t} style={S.pill(selectedTechs.includes(t), '#3b82f6')} onClick={() => toggleTech(t)}>{t}</button>)}
              </div>
            </div>
            {hasActive && <button style={{ ...S.clearBtn, marginTop: 8 }} onClick={clearAll}>✕ Clear all</button>}
          </div>
        )}

        {(selectedTechs.length > 0 || sortBy !== 'newest') && (
          <div style={S.activeTags}>
            {sortBy !== 'newest' && <span style={{ ...S.activeTag, color: '#0d9488', background: 'rgba(13,148,136,.08)', borderColor: 'rgba(13,148,136,.25)' }}>Sort: {SORT_OPTIONS.find(o => o.value === sortBy)?.label}</span>}
            {selectedTechs.map(t => <span key={t} style={S.activeTag} onClick={() => toggleTech(t)}>{t} ✕</span>)}
          </div>
        )}

        <p style={S.resultCount}>Showing {filtered.length} of {projects.length} projects</p>

        {filtered.length === 0 ? (
          <div style={S.emptyWrap}>
            <p style={{ color: '#333', fontFamily: "'DM Mono', monospace", fontSize: '0.82rem' }}>No projects match your filters.</p>
            <button style={S.clearBtn} onClick={clearAll}>Clear filters</button>
          </div>
        ) : (
          <div style={S.grid}>
            {filtered.map(p => <ProjectCard key={p._id} project={p} currentUser={user} onLike={handleLike} searchQuery={searchQuery} activeFilter={activeFilter} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function Highlight({ text, query }) {
  if (!query || !text) return <span>{text}</span>;
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return <span>{text}</span>;
  return <span>{text.slice(0, i)}<span style={{ background: '#854d0e', color: '#fef08a', borderRadius: 2, padding: '0 2px' }}>{text.slice(i, i + query.length)}</span>{text.slice(i + query.length)}</span>;
}

const accents = ['#6ee7b7','#93c5fd','#f9a8d4','#fcd34d','#a5b4fc'];

function ProjectCard({ project, currentUser, onLike, searchQuery, activeFilter }) {
  const isLiked = currentUser ? project.likes.some(id => id === currentUser.id || id?._id === currentUser.id) : false;
  const accent = accents[project.title.charCodeAt(0) % 5];

  return (
    <div
      style={{ background: '#0e0e0e', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', transition: 'background 0.2s', cursor: 'default' }}
      onMouseEnter={e => { e.currentTarget.style.background = '#111'; e.currentTarget.querySelector('.top-line').style.opacity = '1'; }}
      onMouseLeave={e => { e.currentTarget.style.background = '#0e0e0e'; e.currentTarget.querySelector('.top-line').style.opacity = '0'; }}
    >
      <div className="top-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: accent, opacity: 0, transition: 'opacity 0.2s' }} />

      {project.imageUrl && (
        <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block', borderBottom: '1px solid #161616' }} onError={e => e.target.style.display = 'none'} />
      )}

      <div style={{ padding: '20px 20px 0' }}>
        <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.05rem', fontWeight: 400, color: '#e8e6e0', margin: '0 0 5px', letterSpacing: '-0.01em' }}>
          {(activeFilter === 'Title' || activeFilter === 'All') ? <Highlight text={project.title} query={searchQuery} /> : project.title}
        </h3>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: '#333', marginBottom: 10, letterSpacing: '0.03em' }}>
          by {(activeFilter === 'Username' || activeFilter === 'All') ? <Highlight text={project.user?.name || 'Unknown'} query={searchQuery} /> : project.user?.name || 'Unknown'}
        </p>
        <p style={{ fontSize: '0.84rem', color: '#4a4a4a', lineHeight: 1.65, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
          {project.techStack.map((t, i) => (
            <span key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', fontWeight: 500, color: accent, background: accent + '10', border: `1px solid ${accent}20`, padding: '3px 7px', borderRadius: 2 }}>
              {(activeFilter === 'Tech Stack' || activeFilter === 'All') ? <Highlight text={t} query={searchQuery} /> : t}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderTop: '1px solid #161616', marginTop: 'auto' }}>
        <div style={{ display: 'flex', gap: 7 }}>
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none', padding: '5px 11px', borderRadius: 3, border: '1px solid #222', color: '#666', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.target.style.color = '#e8e6e0'; e.target.style.borderColor = '#444'; }}
              onMouseLeave={e => { e.target.style.color = '#666'; e.target.style.borderColor = '#222'; }}>
              GitHub
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none', padding: '5px 11px', borderRadius: 3, border: `1px solid ${accent}30`, color: accent, background: accent + '08', transition: 'all 0.15s' }}>
              Live
            </a>
          )}
        </div>
        <button
          onClick={() => onLike(project._id)}
          style={{ display: 'flex', alignItems: 'center', gap: 5, background: isLiked ? '#2d1f4e' : 'transparent', color: isLiked ? '#a78bfa' : '#2e2e2e', border: `1px solid ${isLiked ? '#7c3aed' : '#1e1e1e'}`, borderRadius: 20, padding: '5px 12px', fontSize: '0.75rem', fontFamily: "'DM Mono', monospace", cursor: 'pointer', transition: 'all 0.2s' }}
        >
          {isLiked ? '♥' : '♡'} {project.likes.length}
        </button>
      </div>
    </div>
  );
}

export default Home;
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Briefcase, FileText, Send, UserCheck, Settings } from 'lucide-react';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem' }}>Welcome, <span className="text-gradient">{user.name}</span></h1>
          <p style={{ color: 'var(--gray)' }}>Manage your {user.role === 'recruiter' ? 'job postings and applications' : 'job applications and profile'}.</p>
        </div>
        <div style={{ padding: '0.5rem 1rem', background: 'var(--dark-light)', borderRadius: 'var(--radius)', border: '1px solid var(--glass-border)' }}>
          <span style={{ color: 'var(--gray)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Account Type</span>
          <p style={{ fontWeight: 700, color: 'var(--primary)', textTransform: 'capitalize' }}>{user.role}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Stats Cards */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: 'var(--radius)', color: 'var(--primary)' }}>
            <Briefcase size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>{user.role === 'recruiter' ? 'Active Jobs' : 'Applications'}</p>
            <h3 style={{ fontSize: '1.5rem' }}>0</h3>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(236, 72, 153, 0.1)', borderRadius: 'var(--radius)', color: 'var(--secondary)' }}>
            <Send size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>{user.role === 'recruiter' ? 'Total Applicants' : 'Interviews'}</p>
            <h3 style={{ fontSize: '1.5rem' }}>0</h3>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius)', color: 'var(--success)' }}>
            <UserCheck size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Profile Views</p>
            <h3 style={{ fontSize: '1.5rem' }}>12</h3>
          </div>
        </div>
      </div>

      {/* Action Sections */}
      <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>Recent Activity</h3>
            <button className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>View All</button>
          </div>
          <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--glass-border)', borderRadius: 'var(--radius)' }}>
            <p style={{ color: 'var(--gray)' }}>No recent activity to show.</p>
          </div>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Quick Actions</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {user.role === 'recruiter' ? (
              <button onClick={() => navigate('/post-job')} className="btn btn-primary" style={{ width: '100%' }}>
                Post a New Job
              </button>
            ) : (
              <button onClick={() => navigate('/jobs')} className="btn btn-primary" style={{ width: '100%' }}>
                Explore Jobs
              </button>
            )}
            <button className="btn btn-outline" style={{ width: '100%' }}>
              <FileText size={18} /> Update Profile
            </button>
            <button className="btn btn-outline" style={{ width: '100%' }}>
              <Settings size={18} /> Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

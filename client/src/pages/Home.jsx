import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Users, Zap, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '4rem 0' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '4rem', marginBottom: '1.5rem' }}
        >
          Find Your Dream <span className="text-gradient">Career</span> Today
        </motion.h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--gray)', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
          Connect with top companies and explore thousands of job opportunities. 
          HireHub is the smartest way to land your next role.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <Link to="/jobs" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>
            Browse Jobs
          </Link>
          <Link to="/register" className="btn btn-outline" style={{ padding: '1rem 2.5rem' }}>
            Join as Recruiter
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
        <div className="glass-card">
          <Zap className="text-gradient" size={32} style={{ marginBottom: '1rem' }} />
          <h3>Fast Search</h3>
          <p style={{ color: 'var(--gray)', marginTop: '0.5rem' }}>Find relevant jobs in seconds with our optimized search engine.</p>
        </div>
        <div className="glass-card">
          <Users className="text-gradient" size={32} style={{ marginBottom: '1rem' }} />
          <h3>Direct Connect</h3>
          <p style={{ color: 'var(--gray)', marginTop: '0.5rem' }}>Communicate directly with hiring managers and recruiters.</p>
        </div>
        <div className="glass-card">
          <Shield className="text-gradient" size={32} style={{ marginBottom: '1rem' }} />
          <h3>Secure Platform</h3>
          <p style={{ color: 'var(--gray)', marginTop: '0.5rem' }}>Your data and privacy are our top priority with JWT security.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;

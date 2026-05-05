import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs, reset } from '../store/slices/jobSlice';
import { MapPin, Briefcase, DollarSign, Clock, Loader2 } from 'lucide-react';

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, isLoading, isError, message } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getJobs());
    return () => dispatch(reset());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Loader2 className="animate-spin" size={48} color="var(--primary)" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Available <span className="text-gradient">Positions</span></h1>
        <p style={{ color: 'var(--gray)' }}>Discover opportunities that match your expertise.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem' }}>{job.title}</h3>
                <span style={{ padding: '0.25rem 0.75rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>
                  {job.type}
                </span>
              </div>
              
              <div style={{ color: 'var(--gray)', fontSize: '0.9rem', display: 'grid', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Briefcase size={16} /> {job.company}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} /> {job.location}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <DollarSign size={16} /> {job.salary}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} /> {new Date(job.createdAt).toLocaleDateString()}
                </div>
              </div>

              <p style={{ marginBottom: '2rem', fontSize: '0.95rem', color: '#cbd5e1', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {job.description}
              </p>

              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Apply Now
              </button>
            </div>
          ))
        ) : (
          <div className="glass-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
            <p style={{ color: 'var(--gray)', fontSize: '1.2rem' }}>No jobs found. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;

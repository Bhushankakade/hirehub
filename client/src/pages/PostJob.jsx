import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../store/slices/jobSlice';
import { Send, Loader2 } from 'lucide-react';

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
    type: 'Full-time',
  });

  const { title, description, company, location, salary, type } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, message } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== 'recruiter') {
    navigate('/');
    return null;
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createJob(formData)).then((res) => {
      if (!res.error) {
        navigate('/jobs');
      }
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <div className="glass-card animate-fade-in">
        <h2 style={{ marginBottom: '2rem' }}>Post a <span className="text-gradient">New Job</span></h2>
        
        {isError && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '1rem', borderRadius: 'var(--radius)', marginBottom: '1.5rem', border: '1px solid var(--danger)' }}>
            {message}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="input-group">
              <label htmlFor="title">Job Title</label>
              <input
                type="text"
                className="input-field"
                id="title"
                name="title"
                value={title}
                placeholder="e.g. Senior Frontend Developer"
                onChange={onChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="company">Company Name</label>
              <input
                type="text"
                className="input-field"
                id="company"
                name="company"
                value={company}
                placeholder="e.g. Google"
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="input-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="input-field"
                id="location"
                name="location"
                value={location}
                placeholder="e.g. Remote or San Francisco"
                onChange={onChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="salary">Salary Range</label>
              <input
                type="text"
                className="input-field"
                id="salary"
                name="salary"
                value={salary}
                placeholder="e.g. $100k - $150k"
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="type">Employment Type</label>
            <select
              className="input-field"
              id="type"
              name="type"
              value={type}
              onChange={onChange}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              className="input-field"
              id="description"
              name="description"
              value={description}
              rows="6"
              placeholder="Provide a detailed description of the role and requirements..."
              onChange={onChange}
              required
              style={{ resize: 'vertical' }}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }} disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Post Job Listing</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;

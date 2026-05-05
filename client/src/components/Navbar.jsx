import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../store/slices/authSlice';
import { LogOut, User, Briefcase, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <nav className="glass" style={{ margin: '1rem', padding: '0.5rem 2rem', position: 'sticky', top: '1rem', zIndex: 100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-1px' }}>
          Hire<span className="text-gradient">Hub</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/jobs">Browse Jobs</Link>
          
          {user ? (
            <>
              {user.role === 'recruiter' && (
                <Link to="/post-job" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                  <PlusCircle size={18} /> Post Job
                </Link>
              )}
              <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={18} /> Dashboard
              </Link>
              <button onClick={onLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem', border: 'none' }}>
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

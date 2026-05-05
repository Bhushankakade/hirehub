import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {children}
      </main>
      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--gray)', fontSize: '0.875rem' }}>
        &copy; {new Date().getFullYear()} HireHub. Built with MERN Stack.
      </footer>
    </>
  );
};

export default Layout;

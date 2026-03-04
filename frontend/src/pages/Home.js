import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Healthcare Management System</h1>
        <p>Book appointments with doctors and manage your health records</p>
        <div className="hero-buttons">
          <Link to="/doctors" className="btn btn-primary">View Doctors</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

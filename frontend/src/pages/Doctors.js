import axios from 'axios';
import { useEffect, useState } from 'react';
import './Doctors.css';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/api/doctors');
      setDoctors(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch doctors');
      setLoading(false);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div className="page">
        <h1>Doctors</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="doctors-grid">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <h3>{doctor.name}</h3>
                <p><strong>Specialty:</strong> {doctor.specialty || 'General'}</p>
                <p><strong>Email:</strong> {doctor.email}</p>
                <button>Book Appointment</button>
              </div>
            ))
          ) : (
            <p>No doctors available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Doctors;

import axios from 'axios';
import { useEffect, useState } from 'react';
import './Appointments.css';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    doctorId: '',
    appointmentDate: '',
    reason: '',
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/appointments');
      setAppointments(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch appointments');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/appointments', formData);
      setShowForm(false);
      setFormData({ doctorId: '', appointmentDate: '', reason: '' });
      fetchAppointments();
    } catch (err) {
      setError('Failed to create appointment');
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div className="page">
        <h1>My Appointments</h1>
        {error && <div className="error-message">{error}</div>}
        
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Book New Appointment'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="appointment-form">
            <input
              type="text"
              name="doctorId"
              placeholder="Doctor ID"
              value={formData.doctorId}
              onChange={handleInputChange}
              required
            />
            <input
              type="datetime-local"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="reason"
              placeholder="Reason for appointment"
              value={formData.reason}
              onChange={handleInputChange}
              rows="4"
            ></textarea>
            <button type="submit">Book Appointment</button>
          </form>
        )}

        <div className="appointments-list">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-item">
                <h3>Appointment ID: {appointment.id}</h3>
                <p><strong>Doctor:</strong> {appointment.doctorId}</p>
                <p><strong>Date:</strong> {new Date(appointment.date).toLocaleString()}</p>
                <p><strong>Status:</strong> {appointment.status || 'Scheduled'}</p>
              </div>
            ))
          ) : (
            <p>No appointments scheduled</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointments;

import { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewReservations.css';

function ViewReservations(){
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }
      
      try {
        const response = await axios.get('http://localhost:6001/api/reservations', {
          headers: {
            'x-auth-token': token
          }
        });
        setReservations(response.data.reservations);
        setError(null);
      } catch (err) {
        setError("Failed to fetch reservations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="container">
      <h2 className="title">Reservations</h2>
      {reservations.length === 0 ? (
        <div>No reservations available.</div>
      ) : (
        <ul className="reservation-list">
          {reservations.map((reservation) => (
            <li key={reservation._id} className="reservation-item">
              <span>{reservation.bookTitle} reserved by {reservation.user}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewReservations;

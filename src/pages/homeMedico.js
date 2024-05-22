import { useEffect, useState } from 'react';
import Link from 'next/link';

const HomeMedico = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showTerminated, setShowTerminated] = useState(false); // State to toggle terminated appointments

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/citas');
        const data = await response.json();
        // Filter out appointments based on showTerminated state
        const filteredAppointments = showTerminated ? data : data.filter(appointment => !appointment.terminada_ci);
        setAppointments(filteredAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [showTerminated]);

  const handleToggleTerminated = () => {
    setShowTerminated(!showTerminated);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, Dr. {user.name}</h1>
      <p>{user.puesto}</p>
      <h2>Citas</h2>
      <button onClick={handleToggleTerminated}>
        {showTerminated ? 'Hide Terminated' : 'Show Terminated'}
      </button>
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index}>
            <Link href={`/medicoCita/${appointment.ID_ci}`}>
              {/* Remove <a> tag and style link as needed */}
              <div style={{ cursor: 'pointer' }}>
                {appointment.Hora_ci} - {appointment.Nom_p}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeMedico;

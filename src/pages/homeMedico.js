import { useEffect, useState } from 'react';
import Link from 'next/link';

const HomeMedico = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showPastAppointments, setShowPastAppointments] = useState(false); // State to toggle past appointments
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]); // Current date in YYYY-MM-DD format

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/citas');
        const data = await response.json();

        // Filter appointments based on current date and showPastAppointments state
        const filteredAppointments = data.filter(appointment => {
          const appointmentDate = appointment.Hora_ci.split('T')[0];
          if (showPastAppointments) {
            return appointmentDate < currentDate;
          } else {
            return appointmentDate === currentDate || (appointmentDate < currentDate && !appointment.terminada_ci);
          }
        });

        setAppointments(filteredAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [showPastAppointments, currentDate]);

  const handleTogglePastAppointments = () => {
    setShowPastAppointments(!showPastAppointments);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, Dr. {user.name}</h1>
      <p>{user.puesto}</p>
      <h2>Citas</h2>
      <button onClick={handleTogglePastAppointments}>
        {showPastAppointments ? 'Hide Past Appointments' : 'Show Past Appointments'}
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

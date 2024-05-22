import { useEffect, useState } from 'react';
import Link from 'next/link';

const HomeEmpleado = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showPastAppointments, setShowPastAppointments] = useState(false); // State to toggle past appointments
  const [searchName, setSearchName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]); // Current date in YYYY-MM-DD format

  // State for adding new PACIENTE
  const [newPatient, setNewPatient] = useState({
    Nom_p: '',
    mail_p: '',
    direc_p: '',
    fechanaci_p: '',
    IDoficial_p: '',
    tel_p: '',
    Ante_no_pat_p: '',
    Ante_here_p: '',
    Ante_pat_p: ''
  });

  // State for adding new CITAS
  const [newAppointment, setNewAppointment] = useState({
    Hora_ci: '',
    fecha_ci: '',
    ID_p: '',
    ID_e: ''
  });

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

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatient),
      });
      if (response.ok) {
        alert('Paciente added successfully!');
        // Clear the form after successful submission
        setNewPatient({
          Nom_p: '',
          mail_p: '',
          direc_p: '',
          fechanaci_p: '',
          IDoficial_p: '',
          tel_p: '',
          Ante_no_pat_p: '',
          Ante_here_p: '',
          Ante_pat_p: ''
        });
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to add paciente.');
      }
    } catch (error) {
      console.error('Error adding paciente:', error);
      alert('Failed to add paciente.');
    }
  };

  const handleAddAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/citas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAppointment),
      });
      if (response.ok) {
        alert('Appointment added successfully!');
        // Clear the form after successful submission
        setNewAppointment({
          Hora_ci: '',
          fecha_ci: '',
          ID_p: '',
          ID_e: ''
        });
        // Re-fetch the appointments after adding a new one
        fetchAppointments();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to add appointment.');
      }
    } catch (error) {
      console.error('Error adding appointment:', error);
      alert('Failed to add appointment.');
    }
  };

  const handleChangeNewPatient = (e) => {
    const { name, value } = e.target;
    setNewPatient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeNewAppointment = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearchByName = async () => {
    try {
      const response = await fetch(`/api/pacientes?name=${searchName}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setPatientId(data[0].ID_p);
        } else {
          alert('Patient not found.');
          setPatientId('');
        }
      } else {
        alert('Failed to search for patient.');
        setPatientId('');
      }
    } catch (error) {
      console.error('Error searching for patient:', error);
      alert('Failed to search for patient.');
      setPatientId('');
    }
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>{user.puesto}</p>
      <p>Empleado ID: {user.id}</p>

      {/* Form to search patient by name */}
      <h2>Search Patient</h2>
      <label>
        Patient Name:
        <input type="text" value={searchName} onChange={handleSearchNameChange} />
      </label>
      <button onClick={handleSearchByName}>Search</button>
      <br />
      <label>
        Patient ID:
        <span>{patientId}</span>
      </label>

      {/* Form to add a new PACIENTE */}
      <h2>Add New Patient</h2>
      <form onSubmit={handleAddPatient}>
        <label>
          Name:
          <input type="text" name="Nom_p" value={newPatient.Nom_p} onChange={handleChangeNewPatient} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="mail_p" value={newPatient.mail_p} onChange={handleChangeNewPatient} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="direc_p" value={newPatient.direc_p} onChange={handleChangeNewPatient} />
        </label>
        <br />
        <label>
          Date of Birth:
          <input type="date" name="fechanaci_p" value={newPatient.fechanaci_p} onChange={handleChangeNewPatient} />
        </label>
        <br />
        <label>
          Official ID:
          <input type="text" name="IDoficial_p" value={newPatient.IDoficial_p} onChange={handleChangeNewPatient} />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" name="tel_p" value={newPatient.tel_p} onChange={handleChangeNewPatient} />
        </label>
        <br />
        <label>
          Non-pathological Antecedents:
          <textarea name="Ante_no_pat_p" value={newPatient.Ante_no_pat_p} onChange={handleChangeNewPatient} />
        </label>
        <br />
        <label>
          Hereditary Antecedents:
          <textarea name="Ante_here_p" value={newPatient.Ante_here_p} onChange={handleChangeNewPatient} />
        </label>
        <br />
        <label>
          Pathological Antecedents:
          <textarea name="Ante_pat_p" value={newPatient.Ante_pat_p} onChange={handleChangeNewPatient} />
        </label>
        <br />
        <button type="submit">Save Patient</button>
      </form>

      {/* Form to add a new CITAS */}
      <h2>Add New Appointment</h2>
      <form onSubmit={handleAddAppointment}>
        <label>
          Empleado ID:
          <input type="text" name="ID_e" value={newAppointment.ID_e} onChange={handleChangeNewAppointment} />
        </label>
        <br />
        <label>
          Time:
          <input type="time" name="Hora_ci" value={newAppointment.Hora_ci} onChange={handleChangeNewAppointment} />
        </label>
        <br />
        <label>
          Date:
          <input type="date" name="fecha_ci" value={newAppointment.fecha_ci} onChange={handleChangeNewAppointment} />
        </label>
        <br />
        <label>
          Patient ID:
          <input type="text" name="ID_p" value={newAppointment.ID_p} onChange={handleChangeNewAppointment} />
        </label>
        <br />
        <button type="submit">Save Appointment</button>
      </form>

      {/* Show/Hide Past Appointments Button */}
      <h2>Citas</h2>
      <button onClick={handleTogglePastAppointments}>
        {showPastAppointments ? 'Hide Past Appointments' : 'Show Past Appointments'}
      </button>
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index}>
            <Link href={`/empleadoCita/${appointment.ID_ci}`}>
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

export default HomeEmpleado;

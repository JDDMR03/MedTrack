import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css';

const MedicoCita = () => {
  const router = useRouter();
  const { id } = router.query; // Extracts the appointment ID from the URL query

  const [appointment, setAppointment] = useState(null);
  const [terminadaCita, setTerminadaCita] = useState(false);
  const [paciente, setPaciente] = useState(null); // State to hold patient details

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const appointmentResponse = await fetch(`/api/citas/${id}`);
        const appointmentData = await appointmentResponse.json();
        setAppointment(appointmentData);
        setTerminadaCita(appointmentData.terminada_ci);

        // Fetch patient details
        const pacienteResponse = await fetch(`/api/pacientes?id=${appointmentData.ID_p}`);
        if (pacienteResponse.status === 200) {
          const pacienteData = await pacienteResponse.json();
          setPaciente(pacienteData[0]); // Assuming the result is an array with one element
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchAppointment();
    }
  }, [id]);

  const handleCitaTerminadaChange = async (e) => {
    try {
      const response = await fetch(`/api/citas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          terminada_ci: e.target.checked,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setTerminadaCita(data.terminada_ci);
        alert('Cita status updated successfully!');
      } else {
        alert(data.error || 'Failed to update cita status.');
      }
    } catch (error) {
      console.error('Error updating cita status:', error);
      alert('Failed to update cita status.');
    }
  };

  if (!appointment || !paciente) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Appointment Details</h1>
      <p>Appointment ID: {appointment.ID_ci}</p>
      <p>Doctor: {appointment.doctor_name}</p>
      <p>Patient: {appointment.patient_name}</p>
      <p>Appointment Time: {appointment.Hora_ci}</p>
      <p>Appointment Date: {appointment.fecha_ci}</p>
      {/* Checkbox and Save Button for CITA */}
      <label>
        <input
          type="checkbox"
          checked={terminadaCita}
          onChange={handleCitaTerminadaChange}
        />
        Terminada
      </label>
      <br />

      {/* Display patient details */}
      <h2>Patient Details</h2>
      <p>Name: {paciente.Nom_p}</p>
      <p>Email: {paciente.mail_p}</p>
      <p>Address: {paciente.direc_p}</p>
      <p>Date of Birth: {paciente.fechanaci_p}</p>
      <p>ID: {paciente.IDoficial_p}</p>
      <p>Phone: {paciente.tel_p}</p>
      <p>Non-Pathological Antecedents: {paciente.Ante_no_pat_p}</p>
      <p>Hereditary Antecedents: {paciente.Ante_here_p}</p>
      <p>Pathological Antecedents: {paciente.Ante_pat_p}</p>
    </div>
  );
};

export default MedicoCita;

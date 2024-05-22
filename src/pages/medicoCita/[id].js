import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const MedicoCita = () => {
  const router = useRouter();
  const { id } = router.query; // Extracts the appointment ID from the URL query

  const [appointment, setAppointment] = useState(null);
  const [consulta, setConsulta] = useState(null);
  const [receta, setReceta] = useState(null);
  const [paciente, setPaciente] = useState(null); // State to hold patient details
  const [motivo, setMotivo] = useState('');
  const [exploFisica, setExploFisica] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [tratamiento, setTratamiento] = useState('');
  const [pronostico, setPronostico] = useState('');
  const [terminadaConsulta, setTerminadaConsulta] = useState(false);
  const [instrucciones, setInstrucciones] = useState('');
  const [terminadaCita, setTerminadaCita] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const appointmentResponse = await fetch(`/api/citas/${id}`);
        const appointmentData = await appointmentResponse.json();
        setAppointment(appointmentData);
        setTerminadaCita(appointmentData.terminada_ci);

        // Fetch existing consulta
        const consultaResponse = await fetch(`/api/consultas/${id}`);
        if (consultaResponse.status === 200) {
          const consultaData = await consultaResponse.json();
          setConsulta(consultaData);
          setMotivo(consultaData.Motivo_c);
          setExploFisica(consultaData.Explo_fis_c);
          setDiagnostico(consultaData.Diagnos_c);
          setTratamiento(consultaData.Trata_c);
          setPronostico(consultaData.Pronos_c);
          setTerminadaConsulta(consultaData.terminada_c);
        }

        // Fetch existing receta
        const recetaResponse = await fetch(`/api/recetas/${id}`);
        if (recetaResponse.status === 200) {
          const recetaData = await recetaResponse.json();
          setReceta(recetaData);
          setInstrucciones(recetaData.Instrucciones_r);
        }

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

  const handleConsultaSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/consultas/${id}`, {
        method: consulta ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Motivo_c: motivo,
          Explo_fis_c: exploFisica,
          Diagnos_c: diagnostico,
          Trata_c: tratamiento,
          Pronos_c: pronostico,
          terminada_c: terminadaConsulta,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setConsulta(data);
        alert('Consulta saved successfully!');
      } else {
        alert(data.error || 'Failed to save consulta.');
      }
    } catch (error) {
      console.error('Error saving consulta:', error);
      alert('Failed to save consulta.');
    }
  };

  const handleRecetaSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/recetas/${id}`, {
        method: receta ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Instrucciones_r: instrucciones,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setReceta(data);
        alert('Receta saved successfully!');
      } else {
        alert(data.error || 'Failed to save receta.');
      }
    } catch (error) {
      console.error('Error saving receta:', error);
      alert('Failed to save receta.');
    }
  };

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

      {/* Form to add or update Consulta */}
      <h2>Add / Update Consulta</h2>
      <form onSubmit={handleConsultaSubmit}>
        <label>
          Motivo:
          <input type="text" value={motivo} onChange={(e) => setMotivo(e.target.value)} />
        </label>
        <br />
        <label>
          Exploración Física:
          <textarea value={exploFisica} onChange={(e) => setExploFisica(e.target.value)} />
        </label>
        <br />
        <label>
          Diagnóstico:
          <textarea value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} />
        </label>
        <br />
        <label>
          Tratamiento:
          <textarea value={tratamiento} onChange={(e) => setTratamiento(e.target.value)} />
        </label>
        <br />
        <label>
          Pronóstico:
          <textarea value={pronostico} onChange={(e) => setPronostico(e.target.value)} />
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={terminadaConsulta}
            onChange={(e) => setTerminadaConsulta(e.target.checked)}
          />
          Terminada
        </label>
        <br />
        <button type="submit">Save Consulta</button>
      </form>

      {/* Form to add or update Receta */}
      <h2>Add / Update Receta</h2>
      <form onSubmit={handleRecetaSubmit}>
        <label>
          Instrucciones:
          <textarea value={instrucciones} onChange={(e) => setInstrucciones(e.target.value)} />
        </label>
        <br />
        <button type="submit">Save Receta</button>
      </form>
    </div>
  );
};

export default MedicoCita;

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const HomeMedico = () => {
  const router = useRouter();
  const [medico, setMedico] = useState(null);

  useEffect(() => {
    const medicoData = JSON.parse(localStorage.getItem('medico'));
    if (medicoData) {
      setMedico(medicoData);
    } else {
      router.push('/login'); // Redirect to login if no medico data
    }
  }, []);

  if (!medico) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {medico.Nom_m}!</h1>
      <p>Puesto: {medico.puesto_m}</p>
      <p>Email: {medico.Mail_m}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default HomeMedico;
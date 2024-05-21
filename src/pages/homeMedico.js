import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const HomeMedico = () => {
  const router = useRouter();
  const [medico, setMedico] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.userType === 'medico') {
      setMedico(userData);
    } else {
      router.push('/index'); // Redirect to login if no medico data
    }
  }, []);

  if (!medico) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {medico.Nom_m}! you are a Medico</h1>
      <p>Puesto: {medico.puesto_m}</p>
      <p>Email: {medico.Mail_m}</p>
      <p>Direccion: {medico.Dire_m}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default HomeMedico;

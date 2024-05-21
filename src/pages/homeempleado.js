import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const HomeEmpleado = () => {
  const router = useRouter();
  const [empleado, setEmpleado] = useState(null);

  useEffect(() => {
    const empleadoData = JSON.parse(localStorage.getItem('empleado'));
    if (empleadoData) {
      setEmpleado(empleadoData);
    } else {
      router.push('/login'); // Redirect to login if no medico data
    }
  }, []);

  if (!empleado) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {empleado.Nom_e}!</h1>
      <p>Puesto: {empleado.puesto_e}</p>
      <p>Email: {empleado.Mail_e}</p>
      <p>Direccion: {empleado.Dire_e}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default HomeEmpleado;

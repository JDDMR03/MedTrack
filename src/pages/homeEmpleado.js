import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const HomeEmpleado = () => {
  const router = useRouter();
  const [empleado, setEmpleado] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.userType === 'empleado') {
      setEmpleado(userData);
    } else {
      router.push('/index'); // Redirect to login if no empleado data
    }
  }, []);

  if (!empleado) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {empleado.Nom_e}! you are a Empleado</h1>
      <p>Puesto: {empleado.puesto_e}</p>
      <p>Email: {empleado.Mail_e}</p>
      <p>Direccion: {empleado.Dire_e}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default HomeEmpleado;

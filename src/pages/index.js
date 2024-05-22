import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('user', JSON.stringify({ ...data.user, userType: data.userType, name: data.user.Nom_m || data.user.Nom_e, puesto: data.user.puesto_m || data.user.puesto_e, id: data.user.ID_m || data.user.ID_e}));
        if (data.userType === 'medico') {
          router.push('/homeMedico');
        } else {
          router.push('/homeEmpleado');
        }
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };
  

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 

const Login = ({ setRol }) => {
  const navigate = useNavigate();
  const [nombre_Usuario, setNombre_Usuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState(null); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Objeto con los datos del formulario
    const formData = {
      nombre_Usuario,
      contrasena,
    };

    try {
      const response = await fetch('http://localhost:5000/crud/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { rol } = await response.json();
        setRol(rol);
        navigate('/Catalogo');
      } else {
        // Manejar el caso de credenciales incorrectas estableciendo el estado de error
        setError('¡Credenciales incorrectas!');
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error);
      // Manejar otros errores estableciendo el estado de error
      setError('Error en la solicitud. Inténtalo de nuevo más tarde.');
    }
  };

  const handleInputClick = () => {
    setError(null);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              required
              value={nombre_Usuario}
              onChange={(e) => setNombre_Usuario(e.target.value)}
              onClick={handleInputClick}
            />
            <label>Ingrese su usuario</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              required
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              onClick={handleInputClick}
            />
            <label>Ingrese su contraseña</label>
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <center>
            <button className='btn-anim1' type="submit">
              Iniciar Sesión
              <span></span>
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default Login;

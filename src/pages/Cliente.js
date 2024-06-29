import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Cliente({ rol }) {

  // Crear un estado para cada campo del formulario
  const [nombre1_cliente, setNombre1_cliente] = useState('');
  const [nombre2_cliente, setNombre2_cliente] = useState('');
  const [apellido1_cliente, setApellido1_cliente] = useState('');
  const [apellido2_cliente, setApellido2_cliente] = useState('');
  const [genero, setGenero] = useState('');
  const [fechanac_cliente, setFechanac_cliente] = useState('');
  const [telefono_cliente, setTelefono_cliente] = useState('');
  const [email_cliente, setEmail_cliente] = useState('');
  const [contrasena_cliente, setContrasena_cliente] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      nombre1_cliente,
      nombre2_cliente,
      apellido1_cliente,
      apellido2_cliente,
      genero,
      fechanac_cliente,
      telefono_cliente,
      email_cliente,
      contrasena_cliente,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/create_cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El registro se creó exitosamente
        <div class="valid-feedback">¡Registro exitoso! 😸</div>
        // Reiniciar los campos del formulario
        setNombre1_cliente('');
        setNombre2_cliente('');
        setApellido1_cliente('');
        setApellido2_cliente('');
        setGenero('');
        setFechanac_cliente('');
        setTelefono_cliente('');
        setEmail_cliente('');
        setContrasena_cliente('');
      } else {
        alert('Por favor complete todos los campos antes de continuar.');
        return(
          <div class="invalid-feedback">Por favor complete todos los campos antes de continuar. 😾</div>
        );
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return (
    <div>
      <Header rol={rol} />

      <Container>
        <Card className="margen-contenedor">
          <Card.Body>
            <Card.Title>Registro de Cliente</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre1_cliente" label="Primer Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el primer nombre"
                      value={nombre1_cliente}
                      onChange={(e) => setNombre1_cliente(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre2_cliente" label="Segundo Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el segundo nombre"
                      value={nombre2_cliente}
                      onChange={(e) => setNombre2_cliente(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="apellido1_cliente" label="Primer Apellido">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el primer apellido"
                      value={apellido1_cliente}
                      onChange={(e) => setApellido1_cliente(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="apellido2_cliente" label="Segundo Apellido">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el segundo apellido"
                      value={apellido2_cliente}
                      onChange={(e) => setApellido2_cliente(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                                    <FloatingLabel controlId="genero" label="Género">
                                        <Form.Select
                                            aria-label="Genero"
                                            value={genero}
                                            onChange={(e) => setGenero(e.target.value)}
                                        >
                                            <option>Seleccione el género</option>
                                            <option value="Femenino">Femenino</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Sin definir">Sin definir</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="fechanac_cliente" label="Fecha de nacimiento">
                    <Form.Control
                      type="date"
                      placeholder="Ingrese la fecha de nacimiento"
                      value={fechanac_cliente}
                      onChange={(e) => setFechanac_cliente(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="telefono_cliente" label="Teléfono">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el número de teléfono"
                      value={telefono_cliente}
                      onChange={(e) => setTelefono_cliente(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="email_cliente" label="Correo Electrónico">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el correo electrónico"
                      value={email_cliente}
                      onChange={(e) => setEmail_cliente(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="contrasena_cliente" label="Contraseña">
                    <Form.Control
                      type="password"
                      placeholder="Ingrese la contraseña"
                      value={contrasena_cliente}
                      onChange={(e) => setContrasena_cliente(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );


}

export default Cliente;
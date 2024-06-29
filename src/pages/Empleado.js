import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Empleado({ rol }) {

    // Crear un estado para cada campo del formulario
    const [nombre1_empleado, setNombre1_empleado] = useState('');
    const [nombre2_empleado, setNombre2_empleado] = useState('');
    const [apellido1_empleado, setApellido1_empleado] = useState('');
    const [apellido2_empleado, setApellido2_empleado] = useState('');
    const [especialidad_empleado, setEspecialidad_empleado] = useState('');
    const [telefono_empleado, setTelefono_empleado] = useState('');
    const [email_empleado, setEmail_empleado] = useState('');
    const [contrasena_empleado, setContrasena_empleado] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con los datos del formulario
        const formData = {
            nombre1_empleado,
            nombre2_empleado,
            apellido1_empleado,
            apellido2_empleado,
            especialidad_empleado,
            telefono_empleado,
            email_empleado,
            contrasena_empleado,
        };

        try {
            // Realizar una solicitud HTTP al backend para enviar los datos
            const response = await fetch('http://localhost:5000/crud/create_empleado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // El registro se creó exitosamente
                alert('Registro exitoso');
                // Reiniciar los campos del formulario
                setNombre1_empleado('');
                setNombre2_empleado('');
                setApellido1_empleado('');
                setApellido2_empleado('');
                setEspecialidad_empleado('');
                setTelefono_empleado('');
                setEmail_empleado('');
                setContrasena_empleado('');
            } else {
                alert('Por favor complete todos los campos antes de continuar.');

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
                        <Card.Title>Registro de Empleado</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">
                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="nombre1_empleado" label="Primer Nombre">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el primer nombre"
                                            value={nombre1_empleado}
                                            onChange={(e) => setNombre1_empleado(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="nombre2_empleado" label="Segundo Nombre">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el segundo nombre"
                                            value={nombre2_empleado}
                                            onChange={(e) => setNombre2_empleado(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="apellido1_empleado" label="Primer Apellido">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el primer apellido"
                                            value={apellido1_empleado}
                                            onChange={(e) => setApellido1_empleado(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="apellido2_empleado" label="Segundo Apellido">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el segundo apellido"
                                            value={apellido2_empleado}
                                            onChange={(e) => setApellido2_empleado(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="especialidad_empleado" label="Especialidad">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese su especialidad"
                                            value={especialidad_empleado}
                                            onChange={(e) => setEspecialidad_empleado(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="telefono_empleado" label="Teléfono">
                                        <Form.Control
                                            type="number"
                                            placeholder="Ingrese el número de teléfono"
                                            value={telefono_empleado}
                                            onChange={(e) => setTelefono_empleado(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="email_empleado" label="Email">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese su email"
                                            value={email_empleado}
                                            onChange={(e) => setEmail_empleado(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="contrasena_empleado" label="Contraseña">
                                        <Form.Control
                                            type="password"
                                            placeholder="Ingrese la contraseña"
                                            value={contrasena_empleado}
                                            onChange={(e) => setContrasena_empleado(e.target.value)}
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

export default Empleado;
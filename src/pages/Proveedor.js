import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Proveedor({ rol }) {

    // Crear un estado para cada campo del formulario
    const [empresa_proveedor, setEmpresa_proveedor] = useState('');
    const [direccion_proveedor, setDireccion_proveedor] = useState('');
    const [ciudad_proveedor, setCiudad_proveedor] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con los datos del formulario
        const formData = {
            empresa_proveedor,
            direccion_proveedor,
            ciudad_proveedor,
        };

        try {
            // Realizar una solicitud HTTP al backend para enviar los datos
            const response = await fetch('http://localhost:5000/crud/create_proveedor', {
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
                setEmpresa_proveedor('');
                setDireccion_proveedor('');
                setCiudad_proveedor('');
            } else {
                alert('Error al registrar el cliente');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud al servidor');
        }
    };

    return (
        <div>
           <Header rol={rol}/>

            <Container>
                <Card className="margen-contenedor">
                    <Card.Body>
                        <Card.Title>Registro de Proveedor</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="empresa_proveedor" label="Empresa">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese la empresa del proveedor"
                                            value={empresa_proveedor}
                                            onChange={(e) => setEmpresa_proveedor(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="direccion_proveedor" label="Direcciòn">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese la direcciòn de la empresa"
                                            value={direccion_proveedor}
                                            onChange={(e) => setDireccion_proveedor(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="ciudad_proveedor" label="Ciudad">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese la ciudad de la empresa"
                                            value={ciudad_proveedor}
                                            onChange={(e) => setCiudad_proveedor(e.target.value)}
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

export default Proveedor;
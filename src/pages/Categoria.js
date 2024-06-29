import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Categoria({ rol }) {

    // Crear un estado para cada campo del formulario
    const [nombre_categoria, setNombre_categoria] = useState('');
    const [descripcion_categoria, setDescripcion_categoria] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con los datos del formulario
        const formData = {
            nombre_categoria,
            descripcion_categoria,
        };

        try {
            // Realizar una solicitud HTTP al backend para enviar los datos
            const response = await fetch('http://localhost:5000/crud/create_categoria', {
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
                setNombre_categoria('');
                setDescripcion_categoria('');
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
                        <Card.Title>Registro de Categoría</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">
                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="nombre_categoria" label="Categoría">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese una Categoría"
                                            value={nombre_categoria}
                                            onChange={(e) => setNombre_categoria(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="descripcion_categoria" label="Descripción">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese una Descripción"
                                            value={descripcion_categoria}
                                            onChange={(e) => setDescripcion_categoria(e.target.value)}
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

export default Categoria;
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Tipo_entrega({ rol }) {

    const [id_empleados, setId_empleados] = useState([]);
    const [id_empleado, setId_empleado] = useState('');

    // Crear un estado para cada campo del formulario
    const [tipo_entrega, setTipo_entrega] = useState('');
    const [estado_entrega, setEstado_entrega] = useState('');
    const [direccion_entrega, setDireccion_entrega] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con los datos del formulario
        const formData = {
            id_empleado,
            tipo_entrega,
            estado_entrega,
            direccion_entrega,
        };

        try {
            // Realizar una solicitud HTTP al backend para enviar los datos
            const response = await fetch('http://localhost:5000/crud/create_tipo_entrega', {
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
                setId_empleado('');
                setTipo_entrega('');
                setEstado_entrega('');
                setDireccion_entrega('');
            } else {
                alert('Error al registrar el producto');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud al servidor');
        }
    };

    useEffect(() => {
        // Realiza una solicitud a tu ruta para obtener las especialidades
        fetch('http://localhost:5000/crud/read_empleado')
            .then(response => response.json())
            .then(data => {
                // Actualiza el estado con las especialidades obtenidas
                setId_empleados(data);
            })
            .catch(error => {
                console.error('Error al obtener las especialidades', error);
            });
    }, []);

    return (
        <div>
           <Header rol={rol}/>

            <Container>
                <Card className="margen-contenedor">
                    <Card.Body>
                        <Card.Title>Nueva entrega</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">

                                 <Col sm="12" md="6" lg="4">
                                    <FloatingLabel controlId="id_empleado" label="Empleado">
                                        <Form.Select
                                            aria-label="id_empleado"
                                            value={id_empleado}
                                            onChange={(e) => setId_empleado(e.target.value)}
                                        >
                                            <option>Seleccione un empleado</option>
                                            {id_empleados.map((empleado) => (
                                                <option key={empleado.id_empleado} value={empleado.id_empleado}>
                                                    {empleado.nombre1_empleado + ' '}
                                                    {empleado.nombre2_empleado + ' '}
                                                    {empleado.apellido1_empleado + ' '}
                                                    {empleado.apellido2_empleado}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="6" lg="4">
                                    <FloatingLabel controlId="tipo_entrega" label="Tipo entrega">
                                        <Form.Select
                                            aria-label="tipo_entrega"
                                            value={tipo_entrega}
                                            onChange={(e) => setTipo_entrega(e.target.value)}
                                        >
                                            <option>Seleccione el tipo de entrega</option>
                                            <option value="Entrega a domicilio">Entrega a domicilio</option>
                                            <option value="Entrega en tienda">Entrega en tienda</option>
                                            <option value="Entrega en punto de recogida">Entrega en punto de recogida</option>
                                            <option value="Entrega express">Entrega express</option>
                                            <option value="Entrega programada">Entrega programada</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="6" lg="4">
                                    <FloatingLabel controlId="estado_entrega" label="Estado entrega">
                                        <Form.Select
                                            aria-label="estado_entrega"
                                            value={estado_entrega}
                                            onChange={(e) => setEstado_entrega(e.target.value)}
                                        >
                                            <option>Estado entrega</option>
                                            <option value="Pendiente">Pendiente</option>
                                            <option value="Proceso de entrega">Proceso de entrega</option>
                                            <option value="Entregado">Entregado</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="direccion_entrega" label="Direccion entrega">
                                        <Form.Control
                                            as="textarea"
                                            className="auto-expand-textarea" // Aplica la clase personalizada aquí
                                            placeholder="Ingrese la direccion de entrega"
                                            value={direccion_entrega}
                                            onChange={(e) => {
                                                setDireccion_entrega(e.target.value);
                                                e.target.style.height = 'auto'; // Restablece la altura a 'auto' para calcular la nueva altura
                                                e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta la altura automáticamente
                                            }}
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

        </div >
    );
}

export default Tipo_entrega;
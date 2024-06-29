import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Cita({ rol }) {

    const [id_clientes, setId_clientes] = useState([]); // Estado para almacenar las categorías
    const [id_cliente, setId_cliente] = useState(''); // Estado para el valor seleccionado de categoría
    const [id_empleados, setId_empleados] = useState([]); // Estado para almacenar los proveedores
    const [id_empleado, setId_empleado] = useState(''); // Estado para el valor seleccionado de proveedor

    // Crear un estado para cada campo del formulario
    const [tipo_servicio, setTipo_servicio] = useState('');
    const [fecha_cita, setFecha_cita] = useState('');
    const [hora_cita, setHora_cita] = useState('');
    const [estado_cita, setEstado_cita] = useState('');
    const [comentario, setComentario] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con los datos del formulario
        const formData = {
            id_cliente,
            id_empleado,
            tipo_servicio,
            fecha_cita,
            hora_cita,
            estado_cita,
            comentario,
        };

        try {
            // Realizar una solicitud HTTP al backend para enviar los datos
            const response = await fetch('http://localhost:5000/crud/create_cita', {
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
                setId_cliente('');
                setId_empleado('');
                setTipo_servicio('');
                setFecha_cita('');
                setHora_cita('');
                setEstado_cita('');
                setComentario('');
            } else {
                alert('Por favor complete todos los campos antes de continuar.');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud al servidor');
        }
    };

    useEffect(() => {
        // Realiza una solicitud a tu ruta para obtener las especialidades
        fetch('http://localhost:5000/crud/read_cliente')
            .then(response => response.json())
            .then(data => {
                // Actualiza el estado con las especialidades obtenidas
                setId_clientes(data);
            })
            .catch(error => {
                console.error('Error al obtener la lista de clientes', error);
            });
    }, []);

    useEffect(() => {
        // Realiza una solicitud a tu ruta para obtener las especialidades
        fetch('http://localhost:5000/crud/read_empleado')
            .then(response => response.json())
            .then(data => {
                // Actualiza el estado con las especialidades obtenidas
                setId_empleados(data);
            })
            .catch(error => {
                console.error('Error al obtener la lista de empleados', error);
            });
    }, []);

    return (
        <div>
            <Header rol={rol} />

            <Container>
                <Card className="margen-contenedor">
                    <Card.Body>
                        <Card.Title>Registro de cita</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">

                                <Col sm="12" md="6" lg="4">
                                    <FloatingLabel controlId="id_cliente" label="Cliente">
                                        <Form.Select
                                            aria-label="id_cliente"
                                            value={id_cliente}
                                            onChange={(e) => setId_cliente(e.target.value)}
                                        >
                                            <option>Seleccione su usuario</option>
                                            {id_clientes.map((cliente) => (
                                                <option key={cliente.id_cliente} value={cliente.id_cliente}>
                                                    {cliente.nombre1_cliente + ' '}
                                                    {cliente.nombre2_cliente + ' '}
                                                    {cliente.apellido1_cliente + ' '}
                                                    {cliente.apellido2_cliente}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>

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

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="tipo_servicio" label="Tipo servicio">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el tipo de servicio"
                                            value={tipo_servicio}
                                            onChange={(e) => setTipo_servicio(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="fecha_cita" label="Fecha cita">
                                        <Form.Control
                                            type="date"
                                            placeholder="Ingrese la fecha de cita"
                                            value={fecha_cita}
                                            onChange={(e) => setFecha_cita(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="hora_cita" label="Hora cita">
                                        <Form.Control
                                            type="time"
                                            placeholder="Ingrese la hora de cita"
                                            value={hora_cita}
                                            onChange={(e) => setHora_cita(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="estado_cita" label="">
                                        <Form.Check
                                            type="checkbox"
                                            label="Estado cita"
                                            checked={estado_cita}
                                            onChange={(e) => setEstado_cita(e.target.checked)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="comentario" label="Comentario">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese su comentario"
                                            value={comentario}
                                            onChange={(e) => setComentario(e.target.value)}
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

export default Cita;
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Resena({ rol }) {

    const [id_clientes, setId_clientes] = useState([]); // Estado para almacenar las categorías
    const [id_cliente, setId_cliente] = useState(''); // Estado para el valor seleccionado de categoría
    const [id_productos, setId_productos] = useState([]); // Estado para almacenar los proveedores
    const [id_producto, setId_producto] = useState(''); // Estado para el valor seleccionado de proveedor

    // Crear un estado para cada campo del formulario
    const [calificacion, setCalificacion] = useState('');
    const [comentario, setComentario] = useState('');
    const [fecha_publicacion, setFecha_publicacion] = useState('');
    const [aprovacion, setAprovacion] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con los datos del formulario
        const formData = {
            id_cliente,
            id_producto,
            calificacion,
            comentario,
            fecha_publicacion,
            aprovacion,
        };

        try {
            // Realizar una solicitud HTTP al backend para enviar los datos
            const response = await fetch('http://localhost:5000/crud/create_resena', {
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
                setId_producto('');
                setCalificacion('');
                setComentario('');
                setFecha_publicacion();
                setAprovacion('');
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
        fetch('http://localhost:5000/crud/read_cliente')
            .then(response => response.json())
            .then(data => {
                // Actualiza el estado con las especialidades obtenidas
                setId_clientes(data);
            })
            .catch(error => {
                console.error('Error al obtener las especialidades', error);
            });
    }, []);

    useEffect(() => {
        // Realiza una solicitud a tu ruta para obtener las especialidades
        fetch('http://localhost:5000/crud/read_producto')
            .then(response => response.json())
            .then(data => {
                // Actualiza el estado con las especialidades obtenidas
                setId_productos(data);
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
                        <Card.Title>Registro de Reseña</Card.Title>
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
                                    <FloatingLabel controlId="id_producto" label="Producto">
                                        <Form.Select
                                            aria-label="Producto"
                                            value={id_producto}
                                            onChange={(e) => setId_producto(e.target.value)}
                                        >
                                            <option>Seleccione un producto</option>
                                            {id_productos.map((producto) => (
                                                <option key={producto.id_producto} value={producto.id_producto}>
                                                    {producto.nombre_producto}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>


                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="calififcacion" label="Calififcacion">
                                        <Form.Control
                                            type="number"
                                            placeholder="Ingrese su calificacion"
                                            value={calificacion}
                                            onChange={(e) => setCalificacion(e.target.value)}
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

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="fecha_publicacion" label="Fecha nacimiento">
                                        <Form.Control
                                            type="date"
                                            placeholder="Ingrese la fecha de publicacion"
                                            value={fecha_publicacion}
                                            onChange={(e) => setFecha_publicacion(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="aprovacion" label="">
                                        <Form.Check
                                            type="checkbox" // Cambiado a "checkbox" para un control de casilla de verificación
                                            label="Aprovación"
                                            checked={aprovacion} // Asegúrate de que aprovacion sea un valor booleano
                                            onChange={(e) => setAprovacion(e.target.checked)} // Usar e.target.checked para establecer el valor booleano
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

export default Resena;
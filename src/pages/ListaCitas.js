import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';
import '../styles/App.css';

function ListaCitas({ rol }) {
    const [citas, setCitas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCita, setSelectedCita] = useState({});
    const [formData, setFormData] = useState({
        id_cliente: '',
        id_empleado: '',
        tipo_servicio: '',
        fecha_cita: '',
        hora_cita: '',
        estado_cita: false,
        comentario: ''
    });

    const [clientes, setClientes] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/crud/read_empleado')
            .then((response) => {
                if (!response.ok) throw new Error('Error al obtener la lista de empleados.');
                return response.json();
            })
            .then((data) => setEmpleados(data))
            .catch((error) => alert(error.message));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/crud/read_cliente')
            .then((response) => {
                if (!response.ok) throw new Error('Error al obtener la lista de clientes.');
                return response.json();
            })
            .then((data) => setClientes(data))
            .catch((error) => alert(error.message));
    }, []);

    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const filteredCitas = citas.filter((cita) => {
        const search = searchQuery.toLowerCase();
        return (
            cita.id_cliente.toString().includes(search) ||
            cita.id_empleado.toString().includes(search) ||
            cita.tipo_servicio.toLowerCase().includes(search) ||
            cita.fecha_cita.includes(search) ||
            cita.hora_cita.includes(search) ||
            cita.estado_cita.toString().includes(search) ||
            cita.comentario.toLowerCase().includes(search)
        );
    });

    const openModal = (cita) => {
        setSelectedCita(cita);
        const formattedfechacita = formatDateForInput(cita.fecha_cita);
        setFormData({
            id_cliente: cita.id_cliente,
            id_empleado: cita.id_empleado,
            tipo_servicio: cita.tipo_servicio,
            fecha_cita: cita.fecha_cita,
            hora_cita: cita.hora_cita,
            estado_cita: cita.estado_cita,
            comentario: cita.comentario
        });
        setShowModal(true);
    };

    function formatDateForInput(dateTimeString) {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Agregar ceros iniciales
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const loadCita = () => {
        fetch('http://localhost:5000/crud/read_cita')
            .then((response) => response.json())
            .then((data) => setCitas(data))
            .catch((error) => console.error('Error al obtener lista de citas:', error));
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: name === 'estado_cita' ? (value === 'true') : value,
        });
    };


    const handleUpdate = () => {
        fetch(`http://localhost:5000/crud/update_cita/${selectedCita.id_cita}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    setShowModal(false);
                    loadCita();
                }
            })
            .catch((error) => console.error('Error al actualizar el registro:', error));
    };


    const handleDelete = (id_cita) => {
        if (window.confirm('¿Seguro que deseas eliminar esta cita?')) {
            fetch(`http://localhost:5000/crud/delete_cita/${id_cita}`, { method: 'DELETE' })
                .then((response) => {
                    if (response.ok) loadCita();
                })
                .catch((error) => console.error('Error al eliminar la cita:', error));
        }
    };

    const handleEstadoChange = (id_cita, estado) => {
        const updatedCita = citas.find(cita => cita.id_cita === id_cita);
        updatedCita.estado_cita = estado === 'Aprobada' ? true : false;

        fetch(`http://localhost:5000/crud/update_cita/${id_cita}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCita),
        })
            .then((response) => {
                if (response.ok) {
                    loadCita();
                }
            })
            .catch((error) => console.error('Error al actualizar el registro:', error));
    };

    useEffect(() => {
        loadCita();
    }, []);

    return (
        <div>
            <Header rol={rol} />
            <Card className="mt-5">
                <Card.Body>
                    <Card.Title className="mb-3">Listado de citas</Card.Title>
                    <Row className="mb-3">
                        <Col>
                            <FloatingLabel controlId="search" label="Buscar">
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Cliente</th>
                                <th>Empleado</th>
                                <th>Servicio</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Comentario</th>
                                <th>Estado Cita</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCitas.map((cita) => (
                                <tr key={cita.id_cita}>
                                    <td>{cita.id_cita}</td>
                                    <td>{cita.nombre1_cliente + ' ' + cita.apellido1_cliente}</td>
                                    <td>{cita.nombre1_empleado + ' ' + cita.apellido1_empleado}</td>
                                    <td>{cita.tipo_servicio}</td>
                                    <td>{formatDateForInput(cita.fecha_cita)}</td>
                                    <td>{cita.hora_cita}</td>
                                    <td>{cita.comentario}</td>
                                    <td className={cita.estado_cita ? 'text-success' : 'text-danger'}>
                                        {cita.estado_cita ? 'Aprobada' : 'Rechazada'}
                                    </td>
                                    <td>
                                        <Button variant="primary" onClick={() => openModal(cita)}><FaPencil /></Button>
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleDelete(cita.id_cita)}><FaTrashCan /></Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar cita</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>Registro de cita</Card.Title>
                            <Form className="mt-3">
                                <Row className="g-3">
                                    <Col sm="12" md="6">
                                        <FloatingLabel controlId="clientes" label="Clientes">
                                            <Form.Select
                                                aria-label="clientes"
                                                name="id_cliente"
                                                value={formData.id_cliente}
                                                onChange={handleFormChange}
                                            >
                                                <option>Seleccione un cliente</option>
                                                {clientes.map((cliente) => (
                                                    <option key={cliente.id_cliente} value={cliente.id_cliente}>
                                                        {cliente.nombre1_cliente + ' ' + cliente.apellido1_cliente}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm="12" md="6">
                                        <FloatingLabel controlId="empleados" label="Empleados">
                                            <Form.Select
                                                aria-label="empleados"
                                                name="id_empleado"
                                                value={formData.id_empleado}
                                                onChange={handleFormChange}
                                            >
                                                <option>Seleccione un empleado</option>
                                                {empleados.map((empleado) => (
                                                    <option key={empleado.id_empleado} value={empleado.id_empleado}>
                                                        {empleado.nombre1_empleado + ' ' + empleado.apellido1_empleado}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm="12" md="6">
                                        <FloatingLabel controlId="tipo_servicio" label="Servicio">
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese el tipo de servicio"
                                                name="tipo_servicio"
                                                value={formData.tipo_servicio}
                                                onChange={handleFormChange}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm="6" md="6" lg="6">
                                        <FloatingLabel controlId="fecha_cita" label="Fecha de Cita">
                                            <Form.Control
                                                type="date"
                                                name="fecha_cita"
                                                value={formData.fecha_cita}
                                                onChange={handleFormChange}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm="12" md="6">
                                        <FloatingLabel controlId="hora_cita" label="Hora">
                                            <Form.Control
                                                type="time"
                                                placeholder="Ingrese la hora de la cita"
                                                name="hora_cita"
                                                value={formData.hora_cita}
                                                onChange={handleFormChange}
                                            />
                                        </FloatingLabel>
                                    </Col>


                                    <Col sm="12" md="6">
                                        <FloatingLabel controlId="estado_cita" label="Estado de la cita">
                                            <Form.Select
                                                aria-label="estado_cita"
                                                name="estado_cita"
                                                value={formData.estado_cita}
                                                onChange={handleFormChange}
                                            >
                                                <option value="">Seleccione un estado</option>
                                                <option value="true">Aprobada</option>
                                                <option value="false">Rechazada</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>



                                    <Col sm="12">
                                        <FloatingLabel controlId="comentario" label="Comentario">
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese su comentario"
                                                name="comentario"
                                                value={formData.comentario}
                                                onChange={handleFormChange}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Actualizar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ListaCitas;

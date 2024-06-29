import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';

function ListaResena({ rol }) {

    const [resenas, setResenas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedResena, setSelectedResena] = useState({});
    const [formData, setFormData] = useState({
        id_cliente: '',
        id_producto: '',
        calificacion: '',
        comentario: '',
        fecha_publicacion: '',
        aprovacion: '',
    });

    const [clientes, setclientes] = useState([]); // Estado para almacenar las clientes
    const [productos, setproductos] = useState([]); // Estado para almacenar los productos


    // Realiza una solicitud GET al servidor para obtener los clientes
    useEffect(() => {
        fetch('http://localhost:5000/crud/read_cliente')
            .then((response) => {
                if (!response.ok) {
                    // Si la respuesta no es exitosa, lanzar un error
                    throw new Error('Error al obtener la lista de clientes. Por favor, inténtelo de nuevo.');
                }
                return response.json();
            })
            .then((data) => {
                // Actualizar el estado con los datos obtenidos
                setclientes(data);
            })
            .catch((error) => {
                console.error('Error al obtener la lista de clientes:', error);
                alert('Ocurrió un error al obtener la lista de clientes. Por favor, inténtelo de nuevo.');
            });
    }, []);


    // Realiza una solicitud GET al servidor para obtener los productos
    useEffect(() => {
        fetch('http://localhost:5000/crud/read_producto')
            .then((response) => {
                if (!response.ok) {
                    // Si la respuesta no es exitosa, lanzar un error
                    throw new Error('Error al obtener la lista de productos. Por favor, inténtelo de nuevo.');
                }
                return response.json();
            })
            .then((data) => {
                // Actualizar el estado con los datos obtenidos
                setproductos(data);
            })
            .catch((error) => {
                console.error('Error al obtener la lista de productos:', error);
                alert('Ocurrió un error al obtener la lista de productos. Por favor, inténtelo de nuevo.');
            });
    }, []);


    const handleImagenChange = (event) => {
        const file = event.target.files[0]; // Obtener el primer archivo seleccionado

        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result; // Obtener la imagen en formato base64
            setFormData({
                ...formData,
                imagen: base64String
            });
        };
        if (file) {
            reader.readAsDataURL(file); // Lee el contenido del archivo como base64
        }
    };
    // Crear busqueda
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredResenas = resenas.filter((resena) => {
        // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
        const id_cliente = resena.id_cliente;
        const id_producto = resena.id_producto;
        const calificacion = resena.calificacion;
        const comentario = resena.comentario.toLowerCase();
        const fecha_publicacion = resena.fecha_publicacion;
        const aprovacion = resena.aprovacion;
        const search = searchQuery.toLowerCase();


        // Verifica si la cadena de búsqueda se encuentra en algún campo
        return (
            id_cliente == (search) ||
            id_producto == (search) ||
            calificacion == (search) ||
            comentario.includes(search) ||
            fecha_publicacion == (search) ||
            aprovacion == (search)
        );
    });

    // Función para abrir el modal y pasar los datos del producto seleccionado
    const openModal = (resena) => {
        setSelectedResena(resena);

        setFormData({
            id_cliente: resena.id_cliente,
            id_producto: resena.id_producto,
            calificacion: resena.calificacion,
            comentario: resena.comentario,
            fecha_publicacion: resena.fecha_publicacion,
            aprovacion: resena.aprovacion,
        });
        setShowModal(true);
    };

    const loadResena = () => {
        fetch('http://localhost:5000/crud/read_resena')
            .then((response) => {
                if (!response.ok) {
                    // Si la respuesta no es exitosa, lanzar un error
                    throw new Error('Error al obtener la lista de reseñas. Por favor, inténtelo de nuevo.');
                }
                return response.json();
            })
            .then((data) => {
                // Actualizar el estado con los datos obtenidos
                setResenas(data);
            })
            .catch((error) => {
                console.error('Error al obtener la lista de reseñas:', error);
                alert('Ocurrió un error al obtener la lista de reseñas. Por favor, inténtelo de nuevo.');
            });
    };


    // Función para manejar cambios en el formulario
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Función para enviar el formulario de actualización
    const handleUpdate = () => {
        // Realiza la solicitud PUT al servidor para actualizar el registro
        fetch(`http://localhost:5000/crud/update_resena/${selectedResena.id_resena}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    // Si la respuesta no es exitosa, lanzar un error
                    throw new Error('Error al actualizar la reseña. Por favor, inténtelo de nuevo.');
                }
                // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de reseñas
                setShowModal(false);
                loadResena(); // Cargar la lista de reseñas actualizada
            })
            .catch((error) => {
                console.error('Error al actualizar la reseña:', error);
                alert('Ocurrió un error al actualizar la reseña. Por favor, inténtelo de nuevo.');
            });
    };


    // Función para eliminar una reseña
    const handleDelete = (id_resena) => {
        const confirmation = window.confirm('¿Seguro que deseas eliminar esta reseña?');
        if (confirmation) {
            // Realiza la solicitud DELETE al servidor para eliminar la reseña
            fetch(`http://localhost:5000/crud/delete_resena/${id_resena}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (!response.ok) {
                        // Si la respuesta no es exitosa, lanzar un error
                        throw new Error('Error al eliminar la reseña. Por favor, inténtelo de nuevo.');
                    }
                    // La eliminación fue exitosa, refresca la lista de reseñas
                    loadResena();
                })
                .catch((error) => {
                    console.error('Error al eliminar la reseña:', error);
                    alert('Ocurrió un error al eliminar la reseña. Por favor, inténtelo de nuevo.');
                });
        }
    };


    // Realiza una solicitud GET al servidor para obtener las reseñas
    useEffect(() => {
        fetch('http://localhost:5000/crud/read_resena')
            .then((response) => {
                if (!response.ok) {
                    // Si la respuesta no es exitosa, lanzar un error
                    throw new Error('Error al obtener las reseñas. Por favor, inténtelo de nuevo.');
                }
                return response.json();
            })
            .then((data) => {
                // Actualiza el estado con las reseñas obtenidas
                setResenas(data);
            })
            .catch((error) => {
                console.error('Error al obtener las reseñas:', error);
                alert('Ocurrió un error al obtener las reseñas. Por favor, inténtelo de nuevo.');
            });
    }, []);


    return (
        <div>
            <Header rol={rol} />

            <Card className="margen-contenedor">
                <Card.Body>
                    <Card.Title className="mb-3">Listado de Reseñas</Card.Title>

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
                                <th style={{ display: 'none' }}>IDCliente</th>
                                <th>Primer nombre</th>
                                <th>Primer apellido</th>
                                <th style={{ display: 'none' }}>IDProducto</th>
                                <th>Producto</th>
                                <th>Imagen</th>
                                <th>Calificación</th>
                                <th>Comentario</th>
                                <th>Publicación</th>
                                <th>Aprobación</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredResenas.map((resena) => (
                                <tr key={resena.id_resena}>
                                    <td>{resena.id_resena}</td>
                                    <td style={{ display: 'none' }}>{resena.id_cliente}</td>
                                    <td>{resena.nombre1_cliente}</td>
                                    <td>{resena.apellido1_cliente}</td>
                                    <td style={{ display: 'none' }}>{resena.id_producto}</td>
                                    <td>{resena.nombre_producto}</td>
                                    <td>
                                        {/* Muestra la imagen en base64 */}
                                        <img src={resena.imagen} alt={resena.nombre} style={{ width: '100px' }} />
                                    </td>
                                    <td>{resena.calificacion}</td>
                                    <td>{resena.comentario}</td>
                                    <td>{resena.fecha_publicacion}</td>
                                    <td>{resena.aprovacion}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => openModal(resena)}><FaPencil /></Button>
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleDelete(resena.id_resena)}><FaTrashCan /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Resena</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>Registro de Producto</Card.Title>
                            <Form className="mt-3">
                                <Row className="g-3">

                                    <Col sm="12" md="6" lg="4">
                                        <FloatingLabel controlId="clientes" label="Cliente">
                                            <Form.Select
                                                aria-label="clientes"
                                                value={clientes}
                                                onChange={(e) => setclientes(e.target.value)}
                                            >
                                                <option>Seleccione su usuario</option>
                                                {clientes.map((cliente) => (
                                                    <option key={cliente.id_cliente} value={cliente.id_cliente}>
                                                        {cliente.nombre1_cliente}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>

                                    <Col sm="12" md="6" lg="4">
                                        <FloatingLabel controlId="productos" label="Producto">
                                            <Form.Select
                                                aria-label="Productos"
                                                value={productos}
                                                onChange={(e) => setproductos(e.target.value)}
                                            >
                                                <option>Seleccione un producto</option>
                                                {productos.map((producto) => (
                                                    <option key={producto.id_producto} value={producto.id_producto}>
                                                        {producto.nombre_producto}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>

                                    <Col sm="6" md="6" lg="4">
                                        <FloatingLabel controlId="calificacion" label="Calificacion">
                                            <Form.Control
                                                type="number"
                                                placeholder="Ingrese su calificacion"
                                                name="calificacion"
                                                value={formData.calificacion}
                                                onChange={handleFormChange}
                                            />
                                        </FloatingLabel>
                                    </Col>

                                    <Col sm="6" md="6" lg="4">
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

                                    <Col sm="6" md="6" lg="4">
                                        <FloatingLabel controlId="fecha_publicacion" label="Fecha publicacion">
                                            <Form.Control
                                                type="date"
                                                placeholder="Ingrese la fecha de publicacion"
                                                name="fecha_publicacion"
                                                value={formData.fecha_publicacion}
                                                onChange={handleFormChange}
                                            />
                                        </FloatingLabel>
                                    </Col>

                                    <Col sm="6" md="6" lg="4">
                                        <FloatingLabel controlId="aprovacion" label="Aprovacion">
                                            <Form.Control
                                                type="checkbox"
                                                name="aprovacion"
                                                checked={formData.aprovacion}
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

export default ListaResena;

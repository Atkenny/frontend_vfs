import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col, Form, Modal, FloatingLabel, Table } from 'react-bootstrap';
import { FaSearch, FaPlus } from 'react-icons/fa';
import Header from '../components/Header';
import '../styles/App.css';
import { FaTrashCan } from 'react-icons/fa6';

function Venta({ rol }) {

    const [formData, setFormData] = useState({
        id_cliente: '',
        id_tipo_pago: '',
        id_entrega: '',
        id_producto: ''
    });

    const [fecha_compra, setFecha_compra] = useState('');
    const [hora_compra, setHora_compra] = useState('');
    const [precio_unitario, setPrecio_unitario] = useState('');
    const [precio_venta, setPrecio_venta] = useState('');
    const [cantidad_compra, setCantidad_compra] = useState('');

    const [cliente, setCliente] = useState([]);
    const [tipo_pago, setTipo_pago] = useState([]);
    const [entrega, setEntrega] = useState([]);
    const [producto, setProducto] = useState([]);

    const [detalle_venta, setDetalle_venta] = useState([]);

    const [showClienteModal, setShowClienteModal] = useState(false);
    const [showTipoPagoModal, setShowTipoPagoModal] = useState(false);
    const [showEntregaModal, setShowEntregaModal] = useState(false);
    const [showProductoModal, setShowProductoModal] = useState(false);

    const [selectedCliente, setSelectedCliente] = useState(null);
    const [selectedTipoPago, setSelectedTipoPago] = useState(null);
    const [selectedEntrega, setSelectedEntrega] = useState(null);
    const [selectedProducto, setSelectedProducto] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const AgregarDetalleProducto = (e) => {
        e.preventDefault();
        if (selectedProducto && cantidad_compra) {
            if (cantidad_compra > selectedProducto.cantidad) {
                alert('Cantidad en stock insuficiente');
            } else {
                const nuevoDetalle = {
                    id_producto: selectedProducto.id_producto,
                    nombre_producto: selectedProducto.nombre_producto,
                    precio_unitario: selectedProducto.precio_venta,
                    cantidad_compra: parseInt(cantidad_compra),

                };

                setDetalle_venta([...detalle_venta, nuevoDetalle])
                setPrecio_unitario('');
                setCantidad_compra('');
                setSelectedProducto('');
            }
        } else {
            alert('Asegúrese de seleccionar un producto o ingresar una cantidad.');
        }
    };

    const EliminarDetalle = (id_producto) => {
        const detalleActualizado = detalle_venta.filter(detalle => detalle.id_producto !== id_producto);
        setDetalle_venta(detalleActualizado);
    };

    const filteredClientes = cliente.filter((cliente) => {
        const id_cliente = cliente.id_cliente.toString();
        const nombre1_cliente = cliente.nombre1_cliente ? cliente.nombre1_cliente.toLowerCase() : '';
        const apellido1_cliente = cliente.apellido1_cliente ? cliente.apellido1_cliente.toLowerCase() : '';
        const search = searchQuery.toLowerCase();

        return (
            id_cliente.includes(search) ||
            nombre1_cliente.includes(search) ||
            apellido1_cliente.includes(search)
        );
    });

    const loadClientes = () => {
        fetch('http://localhost:5000/crud/read_cliente')
            .then((response) => response.json())
            .then((data) => setCliente(data))
            .catch((error) => console.error('Error al obtener los clientes:', error));
    };

    const openClienteModal = (event) => {
        event.preventDefault();
        setShowClienteModal(true);
    };

    const closeClienteModal = () => {
        setShowClienteModal(false);
        setSearchQuery('');
    };

    const selectCliente = (cliente) => {
        setSelectedCliente(cliente);
        setFormData({
            ...formData,
            id_cliente: cliente.id_cliente,
        });
        closeClienteModal();
    };

    const loadTipoPago = () => {
        fetch('http://localhost:5000/crud/read_tipo_pago')
            .then((response) => response.json())
            .then((data) => setTipo_pago(data))
            .catch((error) => console.error('Error al obtener los tipos de pagos:', error));
    };

    const openTipoPagoModal = (event) => {
        event.preventDefault();
        setShowTipoPagoModal(true);
    };

    const closeTipoPagoModal = () => {
        setShowTipoPagoModal(false);
    };

    const selectTipoPago = (tipo_pago) => {
        setSelectedTipoPago(tipo_pago);
        setFormData({
            ...formData,
            id_tipo_pago: tipo_pago.id_tipo_pago,
        });
        closeTipoPagoModal();
    };

    const loadEntrega = () => {
        fetch('http://localhost:5000/crud/read_entrega')
            .then((response) => response.json())
            .then((data) => setEntrega(data))
            .catch((error) => console.error('Error al obtener la entrega:', error));
    };

    const openEntregaModal = (event) => {
        event.preventDefault();
        setShowEntregaModal(true);
    };

    const closeEntregaModal = () => {
        setShowEntregaModal(false);
    };

    const selectEntrega = (entrega) => {
        setSelectedEntrega(entrega);
        setFormData({
            ...formData,
            id_entrega: entrega.id_entrega,
        });
        closeEntregaModal();
    };

    const loadProducto = () => {
        fetch('http://localhost:5000/crud/read_producto')
            .then((response) => response.json())
            .then((data) => setProducto(data))
            .catch((error) => console.error('Error al obtener los productos:', error));
    };

    const openProductoModal = (event) => {
        event.preventDefault();
        setShowProductoModal(true);
    };

    const closeProductoModal = () => {
        setShowProductoModal(false);
    };

    const selectProducto = (producto) => {
        setSelectedProducto(producto);
        setFormData({
            ...formData,
            id_producto: producto.id_producto,
        });
        closeProductoModal();
    };

    useEffect(() => {
        loadClientes();
        loadTipoPago();
        loadEntrega();
        loadProducto();
    }, []);

    useEffect(() => {
        // Función para obtener la fecha actual en formato 'YYYY-MM-DD'
        const obtenerFechaActual = () => {
            const now = new Date();
            const year = now.getFullYear().toString();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        // Establecer la fecha actual al cargar el componente
        setFecha_compra(obtenerFechaActual());
    }, []);

    useEffect(() => {
        // Función para obtener la hora actual en formato 'HH:mm'
        const obtenerHoraActual = () => {
            const now = new Date();
            const hour = now.getHours().toString().padStart(2, '0');
            const minute = now.getMinutes().toString().padStart(2, '0');
            return `${hour}:${minute}`;
        };

        // Establecer la hora actual al cargar el componente
        setHora_compra(obtenerHoraActual());
    }, []);

    const registrarVenta = (e) => {
        e.preventDefault();

        if (selectedCliente && selectedTipoPago && selectedEntrega && detalle_venta.length > 0) {
            const data = {
                id_cliente: selectedCliente.id_cliente,
                id_tipo_pago: selectedTipoPago.id_tipo_pago,
                id_entrega: selectedEntrega.id_entrega,
                fecha_compra,
                hora_compra,
                detalle_venta, // Asumiendo que detalle_venta incluye el precio_venta
            };

            fetch('http://localhost:5000/crud/createventa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('Venta registrada con éxito');
                        alert('¡Venta registrada con éxito!');
                        setFecha_compra('');
                        setHora_compra('');
                        setDetalle_venta([]);
                    } else {
                        console.error('Error al registrar la venta');
                    }
                })
                .catch((error) => {
                    console.error('Error en la solicitud:', error);
                });
        } else {
            alert('Asegúrese de completar la información necesaria para registrar la venta.');
        }
    };



    return (
        <div>
            <Header rol={rol} />

            <Container className="margen-contenedor">
                <Card className="global-margin-top">
                    <Card.Body>
                        <Card.Title className="mt-3 title">Registro de venta</Card.Title>
                        <Form className="mt-3">
                            <Row className="g-3">

                                <Col sm="12" md="4" lg="4">
                                    <FloatingLabel controlId="cliente" label="Cliente">
                                        <Form.Control
                                            type="text"
                                            placeholder="Seleccionar cliente"
                                            name="cliente"
                                            value={selectedCliente ? `${selectedCliente.nombre1_cliente} ${selectedCliente.apellido1_cliente}` : ''}
                                            readOnly
                                        />

                                        <div className="button-container">
                                            <button className="search-button" variant="outline-primary" onClick={openClienteModal}>
                                                <FaSearch />
                                            </button>
                                        </div>

                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="4" lg="4">
                                    <FloatingLabel controlId="tipo_pago" label="Tipo pago">
                                        <Form.Control
                                            type="text"
                                            placeholder="Seleccione un metodo de pago"
                                            name="Tipo pago"
                                            value={selectedTipoPago ? selectedTipoPago.tipo_pago : ''}
                                            readOnly
                                        />

                                        <div className="button-container">
                                            <button className="search-button" variant="outline-primary" onClick={openTipoPagoModal}>
                                                <FaSearch />
                                            </button>
                                        </div>

                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="4" lg="4">
                                    <FloatingLabel controlId="entrega" label="Entrega">
                                        <Form.Control
                                            type="text"
                                            placeholder="Seleccione un entrega"
                                            name="Entrega"
                                            value={selectedEntrega ? selectedEntrega.tipo_entrega : ''}
                                            readOnly
                                        />

                                        <div className="button-container">
                                            <button className="search-button" variant="outline-primary" onClick={openEntregaModal}>
                                                <FaSearch />
                                            </button>
                                        </div>

                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="4" lg="4">
                                    <FloatingLabel controlId="producto" label="Producto">
                                        <Form.Control
                                            type="text"
                                            placeholder="Seleccione un producto"
                                            name="Producto"
                                            value={selectedProducto ? selectedProducto.nombre_producto : ''}
                                            readOnly
                                        />
                                        <div className="button-container">
                                            <button className="search-button" variant="outline-primary" onClick={openProductoModal}>
                                                <FaSearch />
                                            </button>
                                        </div>

                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="2" lg="2">
                                    <FloatingLabel controlId="precio_unitario" label="Precio">
                                        <Form.Control
                                            type="number"
                                            placeholder="Precio del producto"
                                            value={selectedProducto ? selectedProducto.precio_venta : ''}
                                            onChange={(e) => setPrecio_venta(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="2" lg="2">
                                    <FloatingLabel controlId="cantidad_compra" label="Cantidad">
                                        <Form.Control
                                            type="number"
                                            placeholder="Cantidad de producto"
                                            value={cantidad_compra}
                                            onChange={(e) => setCantidad_compra(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="2" lg="2" className="d-flex align-items-center">
                                    <button id="faplus" onClick={AgregarDetalleProducto} variant="outline-success" size="lg">
                                        <FaPlus />
                                    </button>
                                </Col>

                                <Col sm="12" md="12" lg="12">
                                    <Card className="global-margin-top">
                                        <Card.Title className="mt-3 title">Detalle de productos</Card.Title>
                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr id='centertable'>
                                                    <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th>Subtotal</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {detalle_venta.map((detalle) => (
                                                    <tr key={detalle.id_producto}>
                                                        <td>{detalle.id_producto}</td>
                                                        <td>{detalle.nombre_producto}</td>
                                                        <td>{detalle.precio_unitario}</td>
                                                        <td>{detalle.cantidad_compra}</td>
                                                        <td>{detalle.cantidad_compra * detalle.precio_unitario}</td>
                                                        <td className="align-button">
                                                            <Button variant="danger" onClick={() => EliminarDetalle(detalle.id_producto)}>
                                                                <FaTrashCan />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Card>
                                </Col>

                            </Row>
                            <div className="center-button">
                                <button id="registrarventa" variant="primary" onClick={registrarVenta} className="mt-3" size="lg">
                                    Registrar
                                </button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>

            <Modal show={showClienteModal} onHide={closeClienteModal} centered scrollable size="md">
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <Col sm="12" md="12" lg="12">
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
                                <th>Nombre</th>
                                <th>Apellido</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClientes.map((cliente) => (
                                <tr key={cliente.id_cliente} onClick={() => selectCliente(cliente)}>
                                    <td>{cliente.nombre1_cliente}</td>
                                    <td>{cliente.apellido1_cliente}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </Modal.Body>
            </Modal>

            <Modal show={showTipoPagoModal} onHide={closeTipoPagoModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar un metodo de pago</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {tipo_pago.map((tipo_pago) => (
                        <div className="Seleccion tipopago" key={tipo_pago.id_tipo_pago} onClick={() => selectTipoPago(tipo_pago)}>
                            {tipo_pago.tipo_pago}
                        </div>
                    ))}
                </Modal.Body>
            </Modal>

            <Modal show={showEntregaModal} onHide={closeEntregaModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar una entrega</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {entrega.map((entrega) => (
                        <div className="Seleccion tipopago" key={entrega.id_entrega} onClick={() => selectEntrega(entrega)}>
                            {entrega.tipo_entrega}
                        </div>
                    ))}
                </Modal.Body>
            </Modal>

            <Modal show={showProductoModal} onHide={closeProductoModal} centered scrollable size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <Col sm="12" md="12" lg="12">
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
                                <th>Nombre</th>
                                <th>Imagen</th>
                                <th>Precio Unitario</th>
                                <th>Seleccionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {producto.map((producto) => (
                                <tr key={producto.id_producto} onClick={() => selectProducto(producto)}>
                                    <td>{producto.nombre_producto}</td>
                                    <td>
                                        <img src={producto.imagen} alt={producto.nombre_producto} style={{ width: '50px' }} />
                                    </td>
                                    <td>{producto.precio_venta}</td>
                                    <td>
                                        <Button variant="primary" size="sm" onClick={() => selectProducto(producto)}>
                                            Seleccionar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </Modal.Body>
            </Modal>


        </div>
    )
}

export default Venta;

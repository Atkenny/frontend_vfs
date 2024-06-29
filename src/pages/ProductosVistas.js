import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import Header from '../components/Header';

const ProductosVista = ({ rol, productoSeleccionado, onCompraClick, onCarritoClick }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(!!productoSeleccionado);
    }, [productoSeleccionado]);

    const handleClose = () => {
        setShowModal(false);
    };

    const handleShow = () => {
        setShowModal(true);
    };

    return (
        <div>
            <Header rol={rol} />
            <Container className="margen-contenedor">
                <div onClick={handleShow}>
                    {/* Contenido de la tarjeta */}
                </div>

                <Modal show={showModal} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{productoSeleccionado && productoSeleccionado.nombre_producto}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {productoSeleccionado && (
                            <Row>
                                <Col md={6}>
                                    <img
                                        src={productoSeleccionado.imagen}
                                        alt={productoSeleccionado.nombre_producto}
                                        style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <div>
                                        <p className="detalle-titulo">Detalles del Producto</p>
                                        <p className="detalle-item">
                                            <strong>Stock:</strong> {productoSeleccionado.cantidad}
                                        </p>
                                        <p className="detalle-item">
                                            <strong>Género:</strong> {productoSeleccionado.genero}
                                        </p>
                                        <p className="detalle-item">
                                            <strong>Talla:</strong> {productoSeleccionado.talla}
                                        </p>
                                        <hr style={{ margin: '20px 0' }} />
                                        <p className="detalle-precio text-center">
                                            Precio: C${productoSeleccionado.precio_venta}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        )}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={onCompraClick}>
                            Comprar
                        </Button>
                        <Button variant="warning" onClick={onCarritoClick} style={{ marginLeft: '5px' }}>
                            <FaShoppingCart /> Añadir al Carrito
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

export default ProductosVista;

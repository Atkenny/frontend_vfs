import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Card, Badge, Form, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';
import { FaComment, FaStar } from 'react-icons/fa';
import ProductosVistas from './ProductosVistas';

function Catalogo({ rol }) {
  const [productos, setProductos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mostrarVistaDetallada, setMostrarVistaDetallada] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMostrarVistaDetallada = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarVistaDetallada(true);
  };

  const filteredProductos = productos.filter((producto) => {
    const id_producto = producto.id_producto;
    const nombre_producto = producto.nombre_producto.toLowerCase();
    const cantidad = producto.cantidad;
    const precio_venta = producto.precio_venta;
    const genero_producto = producto.genero_producto.toLowerCase();
    const talla = producto.talla;
    const id_categoria = producto.id_categoria;
    const search = searchQuery.toLowerCase();

    return (
      id_producto == search ||
      nombre_producto.includes(search) ||
      cantidad == search ||
      precio_venta == search ||
      genero_producto.includes(search) ||
      talla == search ||
      id_categoria == search
    );
  });

  useEffect(() => {
    fetch('http://localhost:5000/crud/read_producto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <div style={{ backgroundColor: '#303030', minHeight: '100vh', paddingTop:'10px' }}>
      <Header rol={rol} />
      
      <Container className="margen-contenedor">
        <Row className="mb-3">
          <Col sm="12" md="6" lg="12">
            <FloatingLabel controlId="search" label="Buscar">
              <Form.Control style={{ backgroundColor: '#606060', border:'solid 1.5px #0000'}}
                type="text"
                placeholder="Buscar"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="g-3">
          {filteredProductos.map((producto) => (
            <Col sm="12" md="3" lg="3" key={producto.id}>
              <Card style={{ backgroundColor: '#606060'}}  className="h-100">
                <Card.Img
                  className="image-card"
                  variant="top"
                  src={producto.imagen}
                  alt={producto.nombre_producto}
                  style={{ height: '210px', objectFit: 'cover' }}
                  onClick={() => handleMostrarVistaDetallada(producto)}
                />
                <Card.Body>
                  <Card.Title style={{ color: '#ffff' }} >{producto.nombre_producto}</Card.Title>
                  <Card.Text className="text-center" style={{ fontSize: '20px' }}>
                    <Badge> C${producto.precio_venta}</Badge>
                    <hr className="my-1 mx-auto" style={{ width: '70%' }} />
                  </Card.Text>

                  <div>
                    <Badge bg="primary">Stock: {producto.cantidad}</Badge>
                    <Badge bg="success">Género: {producto.genero_producto}</Badge>
                    <Badge bg="warning" text="dark">
                      Talla: {producto.talla}
                    </Badge>
                  </div>
                </Card.Body>

                <Row>
                  <Col>
                    <Card.Body>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Card.Link href="/compra" className="custom-button">
                          Comprar
                        </Card.Link>
                        <div>
                          <Card.Link href="/resena">
                            <FaComment size={20} style={{ color: '#ff5733', marginRight: '10px' }} />
                          </Card.Link>
                          <Card.Link href="/listadeseos">
                            <FaStar size={20} style={{ color: '#f8d528' }} />
                          </Card.Link>
                        </div>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {mostrarVistaDetallada && (
        <ProductosVistas rol={rol} productos={productos} productoSeleccionado={productoSeleccionado} />
      )}
    </div>
  );
}

export default Catalogo;

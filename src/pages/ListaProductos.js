import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';

function ListaProducto({ rol }) {

  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState({});
  const [formData, setFormData] = useState({

    id_proveedor: '',
    id_categoria: '',
    nombre_producto: '',
    imagen: '',
    precio_venta: '',
    precio_compra: '',
    cantidad: '',
    talla: '',
    genero_producto: ''
  });

  const [categorias, setcategorias] = useState([]); // Estado para almacenar las categorías
  const [proveedores, setproveedores] = useState([]); // Estado para almacenar los proveedores

  // Realiza una solicitud GET al servidor para obtener los proveedores
  useEffect(() => {
    fetch('http://localhost:5000/crud/read_proveedor')
      .then((response) => {
        if (!response.ok) {
          // Si la respuesta no es exitosa, lanzar un error
          throw new Error('Error al obtener la lista de proveedores. Por favor, inténtelo de nuevo.');
        }
        return response.json();
      })
      .then((data) => {
        // Actualizar el estado con los datos obtenidos
        setproveedores(data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de proveedores:', error);
        alert('Ocurrió un error al obtener la lista de proveedores. Por favor, inténtelo de nuevo.');
      });
  }, []);

  // Realiza una solicitud GET al servidor para obtener las categorías
  useEffect(() => {
    fetch('http://localhost:5000/crud/read_categoria')
      .then((response) => {
        if (!response.ok) {
          // Si la respuesta no es exitosa, lanzar un error
          throw new Error('Error al obtener la lista de categorías. Por favor, inténtelo de nuevo.');
        }
        return response.json();
      })
      .then((data) => {
        // Actualizar el estado con los datos obtenidos
        setcategorias(data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de categorías:', error);
        alert('Ocurrió un error al obtener la lista de categorías. Por favor, inténtelo de nuevo.');
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

  const filteredProductos = productos.filter((producto) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const id_proveedor = producto.id_proveedor ? String(producto.id_proveedor) : '';
    const id_categoria = producto.id_categoria ? String(producto.id_categoria) : '';
    const nombre_producto = producto.nombre_producto ? producto.nombre_producto.toLowerCase() : '';
    const precio_venta = producto.precio_venta ? String(producto.precio_venta) : '';
    const precio_compra = producto.precio_compra ? String(producto.precio_compra) : '';
    const cantidad = producto.cantidad ? String(producto.cantidad) : '';
    const talla = producto.talla ? producto.talla.toLowerCase() : '';
    const genero_producto = producto.genero_producto ? producto.genero_producto.toLowerCase() : '';
    const search = searchQuery ? searchQuery.toLowerCase() : '';
  
    // Verifica si la cadena de búsqueda se encuentra en algún campo
    return (
      id_proveedor.includes(search) ||
      id_categoria.includes(search) ||
      nombre_producto.includes(search) ||
      precio_venta.includes(search) ||
      precio_compra.includes(search) ||
      cantidad.includes(search) ||
      talla.includes(search) ||
      genero_producto.includes(search)
    );
  });
  

  // Función para abrir el modal y pasar los datos del producto seleccionado
  const openModal = (producto) => {
    setSelectedProducto(producto);

    setFormData({

      id_proveedor: producto.id_proveedor,
      id_categoria: producto.id_categoria,
      nombre_producto: producto.nombre_producto,
      imagen: producto.imagen,
      precio_venta: producto.precio_venta,
      precio_compra: producto.precio_compra,
      cantidad: producto.cantidad,
      talla: producto.talla,
      genero_producto: producto.genero_producto
    });
    setShowModal(true);
  };

  const loadProducto = () => {
    fetch('http://localhost:5000/crud/read_producto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los docentes y personas:', error));
  };

  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleUpdate = () => {

    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/update_producto/${selectedProducto.id_producto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de productos
          setShowModal(false);
          loadProducto(); // Cargar la lista de productos actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };


  // Función para eliminar un docente
  const handleDelete = (id_producto) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este producto?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el docente
      fetch(`http://localhost:5000/crud/delete_producto/${id_producto}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de docentes
            loadProducto();
          }
        })
        .catch((error) => console.error('Error al eliminar el producto:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los docentes
  useEffect(() => {
    fetch('http://localhost:5000/crud/read_producto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <div>
      <Header rol={rol} />

      <Card className="mt-5">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Productos</Card.Title>

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
                <th abbr="Id">Id</th>
                <th style={{ display: 'none' }}>IDProveedor</th>
                <th>Proveedor</th>
                <th style={{ display: 'none' }}>IDCategoria</th>
                <th>Categoría</th>
                <th>Producto</th>
                <th>Imagen</th>
                <th>Precio venta</th>
                <th>Precio compra</th>
                <th>Cantidad</th>
                <th>Talla</th>
                <th>Género</th>
                <th>Editar</th>
                <th>Eliminar</th>

              </tr>
            </thead>
            <tbody>
              {filteredProductos.map((producto) => (
                <tr key={producto.id_producto}>
                  <td>{producto.id_producto}</td>
                  <td style={{ display: 'none' }}>{producto.id_proveedor}</td>
                  <td>{producto.empresa_proveedor}</td> {/* Cambia a empresa_proveedor */}
                  <td style={{ display: 'none' }}>{producto.id_categoria}</td>
                  <td>{producto.nombre_categoria}</td> {/* Cambia a nombre_categoria */}
                  <td>{producto.nombre_producto}</td>
                  <td>
                    {/* Muestra la imagen en base64 */}
                    <img src={producto.imagen} alt={producto.nombre} style={{ width: '100px' }} />
                  </td>
                  <td>C${producto.precio_venta}</td>
                  <td>C${producto.precio_compra}</td>
                  <td>{producto.cantidad}</td>
                  <td>{producto.talla}</td>
                  <td>{producto.genero_producto}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(producto)}><FaPencil /></Button>
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(producto.id_producto)}><FaTrashCan /></Button>
                  </td>
                </tr>
              ))}
            </tbody>

          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Producto</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">

                  <FloatingLabel controlId="proveedores" label="Proveedores">
                    <Form.Select
                      aria-label="proveedores"
                      value={formData.id_proveedor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          id_proveedor: e.target.value
                        })
                      }
                    >
                      <option>Seleccione un proveedor</option>
                      {proveedores.map((proveedor) => (
                        <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                          {proveedor.empresa_proveedor}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="categorias" label="Categorias">
                      <Form.Select
                        aria-label="categorias"
                        value={formData.id_categoria}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            id_categoria: e.target.value
                          })
                        }
                      >
                        <option>Seleccione una categoria</option>
                        {categorias.map((categoria) => (
                          <option key={categoria.id_categoria} value={categoria.id_categoria}>
                            {categoria.nombre_categoria}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="nombre_producto" label="Producto">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre del producto"
                        name="nombre_producto"
                        value={formData.nombre_producto}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="12" lg="12">
                    <Form.Group controlId="imagen" className="" >
                      <Form.Control
                        type="file"
                        accept=".jpg, .png, .jpeg"
                        size="lg"
                        name="imagen"
                        onChange={handleImagenChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="precio_venta" label="Precio venta">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el precio de venta"
                        name="precio_venta"
                        value={formData.precio_venta}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="precio_compra" label="Precio compra">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el precio de compra"
                        name="precio_compra"
                        value={formData.precio_compra}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="cantidad" label="Cantidad">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese la cantidad"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="talla" label="Talla">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su talla"
                        name="talla"
                        value={formData.talla}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="genero_producto" label="Género">
                      <Form.Select
                        aria-label="genero_producto"
                        name="genero_producto"
                        value={formData.genero_producto}
                        onChange={handleFormChange}
                      >
                        <option>Seleccione el género</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Unisex">Unisex</option>
                      </Form.Select>
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

export default ListaProducto;

import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';

function ListaProveedor({ rol }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [proveedores, setProveedores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState({});
  const [formData, setFormData] = useState({
    empresa_proveedor: '',
    direccion_proveedor: '',
    ciudad_proveedor: '',
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Función para abrir el modal y pasar los datos del docente seleccionado
  const openModal = (proveedores) => {
    setSelectedProveedor(proveedores);

    setFormData({
      empresa_proveedor: proveedores.empresa_proveedor,
      direccion_proveedor: proveedores.direccion_proveedor,
      ciudad_proveedor: proveedores.ciudad_proveedor,
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

  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadProveedor = () => {
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
        setProveedores(data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de proveedores:', error);
        alert('Ocurrió un error al obtener la lista de proveedores. Por favor, inténtelo de nuevo.');
      });
  };



  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/update_proveedor/${selectedProveedor.id_proveedor}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de proveedores
          setShowModal(false);
          loadProveedor(); // Cargar la lista de proveedores actualizada
        } else {
          // La respuesta no fue exitosa
          throw new Error('Error al actualizar el registro. Por favor, inténtelo de nuevo.');
        }
      })
      .catch((error) => {
        console.error('Error al actualizar el registro:', error);
        alert('Ocurrió un error al intentar actualizar el proveedor. Por favor, inténtelo de nuevo.');
      });
  };


  // Función para eliminar un proveedor
  const handleDelete = (id_proveedor) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este proveedor?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el proveedor
      fetch(`http://localhost:5000/crud/delete_proveedor/${id_proveedor}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de proveedores
            loadProveedor();
          } else {
            // La respuesta no fue exitosa
            throw new Error('Error al eliminar el proveedor. Por favor, inténtelo de nuevo.');
          }
        })
        .catch((error) => {
          console.error('Error al eliminar el proveedor:', error);
          alert('Ocurrió un error al intentar eliminar el proveedor. Por favor, inténtelo de nuevo.');
        });
    }
  };


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
        setProveedores(data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de proveedores:', error);
        alert('Ocurrió un error al obtener la lista de proveedores. Por favor, inténtelo de nuevo.');
      });
  }, []);


  const filteredProveedor = proveedores.filter((proveedor) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const empresa_proveedor = proveedor.empresa_proveedor.toLowerCase();
    const direccion_proveedor = proveedor.direccion_proveedor.toLowerCase();
    const ciudad_proveedor = proveedor.ciudad_proveedor.toLowerCase();
    const search = searchQuery.toLowerCase();

    // Verifica si la cadena de búsqueda se encuentra en algún campo
    return (
      empresa_proveedor.includes(search) ||
      direccion_proveedor.includes(search) ||
      ciudad_proveedor.includes(search)
    );
  });

  return (
    <div>
      <Header rol={rol} />

      <Card className="margen-contenedor">
        <Card.Body>
          <Card.Title className="mb-3">Listado de proveedores</Card.Title>

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

          <Table striped bordered hover>
            <thead>
              <tr>
                <th abbr="Id">Id</th>
                <th>Empresa</th>
                <th>Dirección</th>
                <th>Ciudad</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {filteredProveedor.map((proveedor) => (
                <tr key={proveedor.id_proveedor}>
                  <td>{proveedor.id_proveedor}</td>
                  <td>{proveedor.empresa_proveedor}</td>
                  <td>{proveedor.direccion_proveedor}</td>
                  <td>{proveedor.ciudad_proveedor}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(proveedor)}><FaPencil /></Button>
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(proveedor.id_proveedor)}><FaTrashCan /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Proveedor</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="empresa_proveedor" label="Empresa">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre de la empresa"
                        name="empresa_proveedor"
                        value={formData.empresa_proveedor}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="direccion_proveedor" label="Direcciòn">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la direcciòn de la empresa"
                        name="direccion_proveedor"
                        value={formData.direccion_proveedor}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="ciudad_proveedor" label="Ciudad">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la ciudad de la empresa"
                        name="ciudad_proveedor"
                        value={formData.ciudad_proveedor}
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

export default ListaProveedor;

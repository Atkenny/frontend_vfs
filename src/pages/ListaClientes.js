import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';

function ListaCliente({ rol }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState({});
  const [formData, setFormData] = useState({
    nombre1_cliente: '',
    nombre2_cliente: '',
    apellido1_cliente: '',
    apellido2_cliente: '',
    fechanac_cliente: '',
    telefono_cliente: '',
    email_cliente: '',
    contrasena_cliente: '',
    rol: '',
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Función para abrir el modal y pasar los datos del docente seleccionado
  const openModal = (clientes) => {
    setSelectedCliente(clientes);

    // Formatea la fecha para el campo "Fecha_Nacimiento"
    const formattedFechanac_cliente = formatDateForInput(clientes.fechanac_cliente);

    setFormData({
      nombre1_cliente: clientes.nombre1_cliente,
      nombre2_cliente: clientes.nombre2_cliente,
      apellido1_cliente: clientes.apellido1_cliente,
      apellido2_cliente: clientes.apellido2_cliente,
      fechanac_cliente: formattedFechanac_cliente,
      telefono_cliente: clientes.telefono_cliente,
      email_cliente: clientes.email_cliente,
      contrasena_cliente: clientes.contrasena_cliente,
      rol: clientes.rol,
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

  const loadCliente = () => {
    fetch('http://localhost:5000/crud/read_cliente')
      .then((response) => {
        if (!response.ok) {
          // Si la respuesta no es exitosa, lanzar un error
          throw new Error('Error al obtener los clientes. Por favor, inténtelo de nuevo.');
        }
        return response.json();
      })
      .then((data) => {
        // Actualizar el estado con los datos obtenidos
        setClientes(data);
      })
      .catch((error) => {
        console.error('Error al obtener los clientes:', error);
        alert('Ocurrió un error al obtener la lista de clientes. Por favor, inténtelo de nuevo.');
      });
  };



  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/update_cliente/${selectedCliente.id_cliente}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de clientes
          setShowModal(false);
          loadCliente(); // Cargar la lista de clientes actualizada
        } else {
          // La respuesta no fue exitosa
          throw new Error('Error al actualizar el registro. Por favor, inténtelo de nuevo.');
        }
      })
      .catch((error) => {
        console.error('Error al actualizar el registro:', error);
        alert('Ocurrió un error al intentar actualizar el cliente. Por favor, inténtelo de nuevo.');
      });
  };


  // Función para eliminar un cliente
  const handleDelete = (id_cliente) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este cliente?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el cliente
      fetch(`http://localhost:5000/crud/delete_cliente/${id_cliente}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de clientes
            loadCliente();
          } else {
            // La respuesta no fue exitosa
            throw new Error('Error al eliminar el cliente. Por favor, inténtelo de nuevo.');
          }
        })
        .catch((error) => {
          console.error('Error al eliminar el cliente:', error);
          alert('Ocurrió un error al intentar eliminar el cliente. Por favor, inténtelo de nuevo.');
        });
    }
  };


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
        setClientes(data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de clientes:', error);
        alert('Ocurrió un error al obtener la lista de clientes. Por favor, inténtelo de nuevo.');
      });
  }, []);


  const filteredCliente = clientes.filter((cliente) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const nombre1_cliente = cliente.nombre1_cliente ? cliente.nombre1_cliente.toLowerCase() : '';
    const nombre2_cliente = cliente.nombre2_cliente ? cliente.nombre2_cliente.toLowerCase() : '';
    const apellido1_cliente = cliente.apellido1_cliente ? cliente.apellido1_cliente.toLowerCase() : '';
    const apellido2_cliente = cliente.apellido2_cliente ? cliente.apellido2_cliente.toLowerCase() : '';
    const fechanac_cliente = cliente.fechanac_cliente ? String(cliente.fechanac_cliente).toLowerCase() : '';
    const telefono_cliente = cliente.telefono_cliente ? cliente.telefono_cliente.toLowerCase() : '';
    const email_cliente = cliente.email_cliente ? cliente.email_cliente.toLowerCase() : '';
    const contrasena_cliente = cliente.contrasena_cliente ? cliente.contrasena_cliente.toLowerCase() : '';
    const rol = cliente.rol ? cliente.rol.toLowerCase() : '';
    const search = searchQuery ? searchQuery.toLowerCase() : '';
  
    // Verifica si la cadena de búsqueda se encuentra en algún campo
    return (
      nombre1_cliente.includes(search) ||
      nombre2_cliente.includes(search) ||
      apellido1_cliente.includes(search) ||
      apellido2_cliente.includes(search) ||
      fechanac_cliente.includes(search) ||
      telefono_cliente.includes(search) ||
      email_cliente.includes(search) ||
      contrasena_cliente.includes(search) ||
      rol.includes(search)
    );
  });
  

  return (
    <div>
      <Header rol={rol} />

      <Card className="margen-contenedor">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Clientes</Card.Title>

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
                <th>Primer nombre</th>
                <th>Segundo nombre</th>
                <th>Primer apellido</th>
                <th>Segundo apellido</th>
                <th>Fecha de Nacimiento</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Contraseña</th>
                <th>Rol</th>
                <th>Editar</th>
                <th>Eliminar</th>

              </tr>
            </thead>
            <tbody>
              {filteredCliente.map((cliente) => (
                <tr key={cliente.id_cliente}>
                  <td>{cliente.id_cliente}</td>
                  <td>{cliente.nombre1_cliente}</td>
                  <td>{cliente.nombre2_cliente}</td>
                  <td>{cliente.apellido1_cliente}</td>
                  <td>{cliente.apellido2_cliente}</td>
                  <td>{formatDateForInput(cliente.fechanac_cliente)}</td>
                  <td>{cliente.telefono_cliente}</td>
                  <td>{cliente.email_cliente}</td>
                  <td>{cliente.contrasena_cliente}</td>
                  <td>{cliente.rol}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(cliente)}><FaPencil /></Button>
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(cliente.id_cliente)}><FaTrashCan /></Button>
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
              <Card.Title>Registro de Cliente</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="nombre1_cliente" label="Nombre">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su primer nombre"
                        name="nombre1_cliente"
                        value={formData.nombre1_cliente}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="nombre2_cliente" label="Segundo nombre">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su segundo nombre"
                        name="nombre2_cliente"
                        value={formData.nombre2_cliente}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="apellido1_cliente" label="Apellido">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su primer apellido"
                        name="apellido1_cliente"
                        value={formData.apellido1_cliente}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="apellido2_cliente" label="Segundo apellido">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su segundo apellido"
                        name="apellido2_cliente"
                        value={formData.apellido2_cliente}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="fechanac_cliente" label="Fecha nacimiento">
                      <Form.Control
                        type="date"
                        placeholder="Seleccione la fecha de nacimiento"
                        name="fechanac_cliente"
                        value={formData.fechanac_cliente}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="telefono_cliente" label="Telefono">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese su numero telefonico"
                        name="telefono_cliente"
                        value={formData.telefono_cliente}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="email_cliente" label="Email">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su email"
                        name="email_cliente"
                        value={formData.email_cliente}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="contrasena_cliente" label="Contraseña">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su contraseña"
                        name="contrasena_cliente"
                        value={formData.contrasena_cliente}
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

export default ListaCliente;

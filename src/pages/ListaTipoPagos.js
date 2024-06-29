import React, { useState, useEffect } from 'react';
import { FaIconName } from 'react-icons/fa';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';

function ListaTipoPago({ rol }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tipo_pagos, setTipo_pagos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTipo_pago, setSelectedTipo_pago] = useState({});
  const [formData, setFormData] = useState({
    tipo: '',
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Función para abrir el modal y pasar los datos del docente seleccionado
  const openModal = (tipo_pagos) => {
    setSelectedTipo_pago(tipo_pagos);

    setFormData({
      tipo: tipo_pagos.tipo,
    });
    setShowModal(true);
  };

  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadTipoPago = (id_tipo_pago) => {
    fetch('http://localhost:5000/crud/read_tipo_pago')
      .then((response) => response.json())
      .then((data) => setTipo_pagos(data))
      .catch((error) => console.error('Error al obtener los tipos de pago:', error));
  };



  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/update_tipo_pago/${selectedTipo_pago.id_tipo_pago}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de tipos de pago
          setShowModal(false);
          loadTipoPago(); // Cargar la lista de tipos de pago actualizada
        } else {
          // Muestra un mensaje de error si la respuesta no es exitosa
          console.error('Error al actualizar el registro:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud de actualización:', error);
      });
  };


  // Función para eliminar un tipo de pago
  const handleDelete = (id_tipo_pago) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este tipo de pago?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el tipo de pago
      fetch(`http://localhost:5000/crud/delete_tipo_pago/${id_tipo_pago}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de tipos de pago
            loadTipoPago();
          } else {
            // Muestra un mensaje de error si la eliminación no fue exitosa
            console.error('Error al eliminar el tipo de pago:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error al realizar la solicitud de eliminación:', error);
        });
    }
  };

  // Realiza una solicitud GET al servidor para obtener los tipos de pago
  useEffect(() => {
    fetch('http://localhost:5000/crud/read_tipo_pago')
      .then((response) => response.json())
      .then((data) => setTipo_pagos(data))
      .catch((error) => console.error('Error al obtener los tipos de pago:', error));
  }, []);



  const filteredTipo_pago = tipo_pagos.filter((tipo_pago) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const tipo = tipo_pago.tipo ? tipo_pago.tipo.toLowerCase() : '';
    const search = searchQuery ? searchQuery.toLowerCase() : '';
  
    // Verifica si la cadena de búsqueda se encuentra en algún campo
    return tipo.includes(search);
  });
  

  return (
    <div>
      <Header rol={rol} />

      <Card className="margen-contenedor">
        <Card.Body>
          <Card.Title className="mb-3">Metodos de pago</Card.Title>

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
                <th>Nombre Tipo</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {filteredTipo_pago.map((tipo_pago) => (
                <tr key={tipo_pago.id_tipo_pago}>
                  <td>{tipo_pago.id_tipo_pago}</td>
                  <td>{tipo_pago.tipo_pago}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(tipo_pago)}><FaPencil /></Button>
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(tipo_pago.id_tipo_pago)}><FaTrashCan /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar metodo de pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de metodo de pago</Card.Title>

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

              <Form className="mt-3">
                <Row className="g-3">

                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="tipo" label="Tipo pago">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nuevo metodo de pago"
                        name="tipo"
                        value={formData.tipo}
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

export default ListaTipoPago;

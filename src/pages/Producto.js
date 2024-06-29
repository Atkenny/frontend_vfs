import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';
import ProveedorForm from '../pages/Proveedor'; // Importar el nuevo componente

function Producto({ rol }) {

    const [id_categorias, setId_categorias] = useState([]); // Estado para almacenar las categorías
    const [id_categoria, setId_categoria] = useState(''); // Estado para el valor seleccionado de categoría
    const [id_proveedores, setId_proveedores] = useState([]); // Estado para almacenar los proveedores
    const [id_proveedor, setId_proveedor] = useState('');
    const [showModal, setShowModal] = useState(false);

    // Crear un estado para cada campo del formulario
    const [nombre_producto, setNombre_producto] = useState('');
    const [precio_venta, setPrecio_venta] = useState('');
    const [precio_compra, setPrecio_compra] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [talla, setTalla] = useState(' ');
    const [genero_producto, setGenero_producto] = useState('');

    const [imagen, setImagen] = useState('');

    const handleImagenChange = (event) => {
        const file = event.target.files[0]; // Obtener el primer archivo seleccionado

        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result; // Obtener la imagen en formato base64
            setImagen(base64String); // Puedes visualizar la imagen en base64 en la consola para asegurarte de que la conversión se hizo correctamente
        };
        if (file) {
            reader.readAsDataURL(file); // Lee el contenido del archivo como base64
        }
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con los datos del formulario
        const formData = {
            id_proveedor,
            id_categoria,
            nombre_producto,
            imagen,
            precio_venta,
            precio_compra,
            cantidad,
            talla,
            genero_producto,
        };

        try {
            // Realizar una solicitud HTTP al backend para enviar los datos
            const response = await fetch('http://localhost:5000/crud/create_producto', {
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
                setId_proveedor('');
                setId_categoria('');
                setNombre_producto('');
                setImagen('')
                setPrecio_venta('');
                setPrecio_compra('');
                setCantidad('');
                setTalla('');
                setGenero_producto('');
            } else {
                alert('Error al registrar el producto');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud al servidor');
        }
    };

    useEffect(() => {
        // Realiza una solicitud a tu ruta para obtener los proveedores
        fetch('http://localhost:5000/crud/read_proveedor')
            .then(response => response.json())
            .then(data => {
                // Actualiza el estado con los proveedores obtenidos
                setId_proveedores(data);
            })
            .catch(error => {
                console.error('Error al obtener los proveedores', error);
            });
    }, []);

    useEffect(() => {
        // Realiza una solicitud a tu ruta para obtener las categorías
        fetch('http://localhost:5000/crud/read_categoria')
            .then(response => response.json())
            .then(data => {
                // Actualiza el estado con las categorías obtenidas
                setId_categorias(data);
            })
            .catch(error => {
                console.error('Error al obtener las categorías', error);
            });
    }, []);


    return (
        <div>
            <Header rol={rol} />

            <Container>
                <Card className="margen-contenedor">
                    <Card.Body>
                        <Card.Title>Registro de Producto</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">

                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="id_proveedor" label="Proveedor">
                                        <Form.Select
                                            aria-label="id_proveedor"
                                            value={id_proveedor}
                                            onChange={(e) => setId_proveedor(e.target.value)}
                                        >
                                            <option>Seleccione un proveedor</option>
                                            {id_proveedores.map((proveedor) => (
                                                <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                                                    {proveedor.empresa_proveedor}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="id_categoria" label="Categoría">
                                        <Form.Select
                                            aria-label="id_categoria"
                                            value={id_categoria}
                                            onChange={(e) => setId_categoria(e.target.value)}
                                        >
                                            <option>Seleccione una categoría</option>
                                            {id_categorias.map((categoria) => (
                                                <option key={categoria.id_categoria} value={categoria.id_categoria}>
                                                    {categoria.nombre_categoria}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="nombre_producto" label="Producto">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el nombre del producto"
                                            value={nombre_producto}
                                            onChange={(e) => setNombre_producto(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="6" lg="6">
                                    <Form.Group controlId="imagen" className="">
                                        <Form.Control
                                            type="file"
                                            accept=".jpg, .png, .jpeg"
                                            size="lg"
                                            onChange={handleImagenChange}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="precio_venta" label="Precio venta">
                                        <Form.Control
                                            type="number"
                                            placeholder="Ingrese el precio de venta"
                                            value={precio_venta}
                                            onChange={(e) => setPrecio_venta(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="precio_compra" label="Precio compra">
                                        <Form.Control
                                            type="number"
                                            placeholder="Ingrese el precio de compra"
                                            value={precio_compra}
                                            onChange={(e) => setPrecio_compra(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="cantidad" label="Cantidad">
                                        <Form.Control
                                            type="number"
                                            placeholder="Ingrese la cantidad"
                                            value={cantidad}
                                            onChange={(e) => setCantidad(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="talla" label="Talla">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese la talla"
                                            value={talla}
                                            onChange={(e) => setTalla(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="genero" label="Género">
                                        <Form.Select
                                            aria-label="Genero"
                                            value={genero_producto}
                                            onChange={(e) => setGenero_producto(e.target.value)}
                                        >
                                            <option>Seleccione el género</option>
                                            <option value="Femenino">Femenino</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Unisex">Unisex</option>
                                        </Form.Select>
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
        </div>
    );

}

export default Producto;
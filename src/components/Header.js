import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Offcanvas, Button, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaRightFromBracket } from 'react-icons/fa6';

function Header({ rol }) {

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Función para cerrar sesión
  const cerrarSesion = () => {
    // Eliminar el rol del localStorage al cerrar sesión
    localStorage.removeItem('userRol');
  };

  return (

    <div>
      {rol === 'admin' && (
        <div>
          <Navbar className="navbar-color" variant="dark" expand="md" fixed='top'>
            <Container>
              <Navbar.Brand href="#home">Variedades Figueroa Soza</Navbar.Brand>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{ display: 'none' }}
                className="d-sm-none d-xs-none"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">

                  <Nav.Link>
                    <Link to="/Catalogo" className="link-unstyled">Catálogo</Link>
                  </Nav.Link>

                  <Nav.Link>
                    <Link to="/Venta" className="link-unstyled">Compra</Link>
                  </Nav.Link>

                  <Nav.Link>
                    <Link to="/Estadisticas" className="link-unstyled">Estadisticas</Link>
                  </Nav.Link>

                  <Nav.Link>
                    <Link to="/Reportes_BI" className="link-unstyled">Reportes BI</Link>
                  </Nav.Link>

                  <NavDropdown title="Usuarios" id="usuarios">
                    <NavDropdown.Item>
                      <Link to="/Cliente" className="link-unstyled">Registrar Cliente</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/Empleado" className="link-unstyled">Registrar Empleado</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Link to="/ListaClientes" className="link-unstyled">Listar Clientes</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaEmpleados" className="link-unstyled">Listar Empleado</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Recursos" id="categoriasproveedores">
                    <NavDropdown.Item>
                      <Link to="/Categoria" className="link-unstyled">Registrar Categoria</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/Proveedor" className="link-unstyled">Registrar Proveedor</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Link to="/ListaCategorias" className="link-unstyled">Listar Categoria</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaProveedores" className="link-unstyled">Listar Proveedores</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Productos" id="productos">
                    <NavDropdown.Item>
                      <Link to="/Producto" className="link-unstyled">Registrar Producto</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/Tipo_pago" className="link-unstyled">Nuevo metodo de pago</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Link to="/ListaTipoPago" className="link-unstyled">Tipos de pago</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaProductos" className="link-unstyled">Listar Productos</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaResenas" className="link-unstyled">Listar Reseñas</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaTipoEntrega" className="link-unstyled">Listar Entregas</Link>
                    </NavDropdown.Item>

                  </NavDropdown>

                  <NavDropdown title="Servicios" id="cita">
                    <NavDropdown.Item>
                      <Link to="/Cita" className="link-unstyled">Crear cita</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Link to="/ListaCitas" className="link-unstyled">Listar Citas</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link>
                    <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
                  </Nav.Link>

                </Nav>
              </Navbar.Collapse>
              <Button
                variant="outline-light"
                onClick={toggleMenu}
                className="d-md-none d-block"
                aria-controls="basic-navbar-nav"
                aria-expanded={showMenu ? 'true' : 'false'}
              >
                Menú
              </Button>
            </Container>
          </Navbar>

          {/* Menú lateral (Offcanvas) */}
          <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">

                <Nav.Link>
                  <Link to="/Catalogo" className="link-unstyled">Catálogo</Link>
                </Nav.Link>

                <Nav.Link>
                  <Link to="/Venta" className="link-unstyled">Compra</Link>
                </Nav.Link>

                <Nav.Link>
                  <Link to="/Estadisticas" className="link-unstyled">Estadisticas</Link>
                </Nav.Link>

                <Nav.Link>
                  <Link to="/Reportes_BI" className="link-unstyled">Reportes BI</Link>
                </Nav.Link>

                <NavDropdown title="Usuarios" id="usuarios">
                  <NavDropdown.Item>
                    <Link to="/Cliente" className="link-unstyled">Registrar Cliente</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/Empleado" className="link-unstyled">Registrar Empleado</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item>
                    <Link to="/ListaClientes" className="link-unstyled">Listar Clientes</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ListaEmpleados" className="link-unstyled">Listar Empleado</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Recursos" id="categoriasproveedores">
                  <NavDropdown.Item>
                    <Link to="/Categoria" className="link-unstyled">Registrar Categoria</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/Proveedor" className="link-unstyled">Registrar Proveedor</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item>
                    <Link to="/ListaCategorias" className="link-unstyled">Listar Categoria</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ListaProveedores" className="link-unstyled">Listar Proveedores</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Productos" id="productos">
                  <NavDropdown.Item>
                    <Link to="/Producto" className="link-unstyled">Registrar Producto</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/Tipo_pago" className="link-unstyled">Nuevo metodo de pago</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item>
                    <Link to="/ListaTipoPago" className="link-unstyled">Tipos de pago</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ListaProductos" className="link-unstyled">Listar Productos</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ListaResenas" className="link-unstyled">Listar Reseñas</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ListaTipoEntrega" className="link-unstyled">Listar Entregas</Link>
                  </NavDropdown.Item>

                </NavDropdown>

                <NavDropdown title="Servicios" id="cita">
                  <NavDropdown.Item>
                    <Link to="/Cita" className="link-unstyled">Crear cita</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item>
                    <Link to="/ListaCitas" className="link-unstyled">Listar Citas</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link>
                  <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
                </Nav.Link>

              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      )}

      {rol === 'vendedor' && (
        <div>
          <Navbar className="navbar-color" variant="dark" expand="md" fixed='top'>
            <Container>
              <Navbar.Brand href="#home">Variedades Figueroa Soza</Navbar.Brand>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{ display: 'none' }}
                className="d-sm-none d-xs-none"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">

                  <Nav.Link>
                    <Link to="/Catalogo" className="link-unstyled">Catálogo</Link>
                  </Nav.Link>

                  <Nav.Link>
                    <Link to="/Venta" className="link-unstyled">Compra</Link>
                  </Nav.Link>

                  <Nav.Link>
                    <Link to="/Estadisticas" className="link-unstyled">Estadisticas</Link>
                  </Nav.Link>

                  <NavDropdown title="Usuarios" id="usuarios">
                    <NavDropdown.Item>
                      <Link to="/Cliente" className="link-unstyled">Registrar Cliente</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/Empleado" className="link-unstyled">Registrar Empleado</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Link to="/ListaClientes" className="link-unstyled">Listar Clientes</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaEmpleados" className="link-unstyled">Listar Empleado</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Recursos" id="categoriasproveedores">

                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Link to="/ListaCategorias" className="link-unstyled">Listar Categoria</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaProveedores" className="link-unstyled">Listar Proveedores</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Productos" id="productos">

                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Link to="/ListaTipoPago" className="link-unstyled">Tipos de pago</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaProductos" className="link-unstyled">Listar Productos</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaResenas" className="link-unstyled">Listar Reseñas</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaTipoEntrega" className="link-unstyled">Listar Entregas</Link>
                    </NavDropdown.Item>

                  </NavDropdown>

                  <NavDropdown title="Servicios" id="cita">
                    <NavDropdown.Item>
                      <Link to="/Cita" className="link-unstyled">Crear cita</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Link to="/ListaCitas" className="link-unstyled">Listar Citas</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link>
                    <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
                  </Nav.Link>

                </Nav>
              </Navbar.Collapse>
              <Button
                variant="outline-light"
                onClick={toggleMenu}
                className="d-md-none d-block"
                aria-controls="basic-navbar-nav"
                aria-expanded={showMenu ? 'true' : 'false'}
              >
                Menú
              </Button>
            </Container>
          </Navbar>

          {/* Menú lateral (Offcanvas) */}
          <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">

                <Nav.Link>
                  <Link to="/Catalogo" className="link-unstyled">Catálogo</Link>
                </Nav.Link>

                <Nav.Link>
                  <Link to="/Venta" className="link-unstyled">Compra</Link>
                </Nav.Link>

                <Nav.Link>
                  <Link to="/Estadisticas" className="link-unstyled">Estadisticas</Link>
                </Nav.Link>

                <NavDropdown title="Usuarios" id="usuarios">
                  <NavDropdown.Item>
                    <Link to="/Cliente" className="link-unstyled">Registrar Cliente</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/Empleado" className="link-unstyled">Registrar Empleado</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item>
                    <Link to="/ListaClientes" className="link-unstyled">Listar Clientes</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ListaEmpleados" className="link-unstyled">Listar Empleado</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Recursos" id="categoriasproveedores">

                  <NavDropdown.Divider />

                  <NavDropdown.Item>
                    <Link to="/ListaCategorias" className="link-unstyled">Listar Categoria</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ListaProveedores" className="link-unstyled">Listar Proveedores</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Productos" id="productos">

                  <NavDropdown.Divider />

                  <NavDropdown.Item>
                    <Link to="/ListaTipoPago" className="link-unstyled">Tipos de pago</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ListaProductos" className="link-unstyled">Listar Productos</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ListaResenas" className="link-unstyled">Listar Reseñas</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/ListaTipoEntrega" className="link-unstyled">Listar Entregas</Link>
                  </NavDropdown.Item>

                </NavDropdown>

                <NavDropdown title="Servicios" id="cita">
                  <NavDropdown.Item>
                    <Link to="/Cita" className="link-unstyled">Crear cita</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item>
                    <Link to="/ListaCitas" className="link-unstyled">Listar Citas</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link>
                  <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
                </Nav.Link>

              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </div>

      )}

      {rol === 'cliente' && (
        <div>

          <Navbar className="navbar-color" variant="dark" expand="md" fixed='top'>
            <Container>
              <Navbar.Brand href="#home">Variedades Figueroa Soza</Navbar.Brand>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{ display: 'none' }}
                className="d-sm-none d-xs-none"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">

                  <Nav.Link>
                    <Link to="/Catalogo" className="link-unstyled">Catálogo</Link>
                  </Nav.Link>

                  <Nav.Link>
                    <Link to="/Venta" className="link-unstyled">Compra</Link>
                  </Nav.Link>

                    <NavDropdown.Divider />

                  <NavDropdown title="Productos" id="productos">

                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Link to="/ListaProductos" className="link-unstyled">Listar Productos</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaResenas" className="link-unstyled">Listar Reseñas</Link>
                    </NavDropdown.Item>

                  </NavDropdown>

                  <NavDropdown title="Servicios" id="cita">
                    <NavDropdown.Item>
                      <Link to="/Cita" className="link-unstyled">Crear cita</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Link to="/ListaCitas" className="link-unstyled">Listar Citas</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link>
                    <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
                  </Nav.Link>

                </Nav>
              </Navbar.Collapse>
              <Button
                variant="outline-light"
                onClick={toggleMenu}
                className="d-md-none d-block"
                aria-controls="basic-navbar-nav"
                aria-expanded={showMenu ? 'true' : 'false'}
              >
                Menú
              </Button>
            </Container>
          </Navbar>

          {/* Menú lateral (Offcanvas) */}
          <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">

              <Nav.Link>
                    <Link to="/Catalogo" className="link-unstyled">Catálogo</Link>
                  </Nav.Link>

                  <Nav.Link>
                    <Link to="/Venta" className="link-unstyled">Compra</Link>
                  </Nav.Link>

                    <NavDropdown.Divider />

                  <NavDropdown title="Productos" id="productos">

                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Link to="/ListaProductos" className="link-unstyled">Listar Productos</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ListaResenas" className="link-unstyled">Listar Reseñas</Link>
                    </NavDropdown.Item>

                  </NavDropdown>

                  <NavDropdown title="Servicios" id="cita">
                    <NavDropdown.Item>
                      <Link to="/Cita" className="link-unstyled">Crear cita</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                      <Link to="/ListaCitas" className="link-unstyled">Listar Citas</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link>
                    <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
                  </Nav.Link>

              </Nav>
            </Offcanvas.Body>
          </Offcanvas>

        </div>
      )}
    </div>

  );
}

export default Header;
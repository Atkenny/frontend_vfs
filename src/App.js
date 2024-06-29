  import React, { useState, useEffect } from 'react';
  import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
  import Home from './pages/Home';
  import Cliente from './pages/Cliente';
  import ListaClientes from './pages/ListaClientes';
  import Empleado from './pages/Empleado';
  import ListaEmpleados from './pages/ListaEmpleados';
  import Categoria from './pages/Categoria';
  import ListaCategorias from './pages/ListaCategorias';
  import Proveedor from './pages/Proveedor';
  import ListaProveedores from './pages/ListaProveedores';
  import Producto from './pages/Producto';
  import ListaProductos from './pages/ListaProductos';
  import Resena from './pages/Resena';
  import ListaResenas from './pages/ListaResenas';
  import Cita from './pages/Cita';
  import ListaCitas from './pages/ListaCitas';
  import Tipo_pago from './pages/Tipo_pago';
  import ListaTipoPago from './pages/ListaTipoPagos';
  import Tipo_entrega from './pages/Tipo_entrega';
  import ListaTipoEntrega from './pages/ListaTipoEntrega';
  import Estadisticas from './pages/Estadisticas';
  import Reportes_BI from './pages/Reportes_BI';
  import Catalogo from './pages/Catalogo';
  import Login from './pages/Login';
  import Venta from './pages/Venta';
  import SinAcceso from './pages/SinAcceso';

  function App() {

    const storedRol = localStorage.getItem('userRol');

    //const [userRol, setUserRol] = useState('');
    const [userRol, setUserRol] = useState(storedRol || '');

    // Guardar el rol del usuario en localStorage cada vez que cambie
    useEffect(() => {
      localStorage.setItem('userRol', userRol);
    }, [userRol]);

    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login setRol={setUserRol} />} />
          <Route path="/Home" element={userRol ? <Home rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/Catalogo" element={userRol ? <Catalogo rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/Cliente" element={userRol ? <Cliente rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/ListaClientes" element={userRol ? <ListaClientes rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/Empleado" element={userRol ? <Empleado rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/ListaEmpleados" element={userRol ? <ListaEmpleados rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/Categoria" element={userRol ? <Categoria rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/ListaCategorias" element={userRol ? <ListaCategorias rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/Proveedor" element={userRol ? <Proveedor rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/ListaProveedores" element={userRol ? <ListaProveedores rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/Producto" element={userRol ? <Producto rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/ListaProductos" element={userRol ? <ListaProductos rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/Resena" element={userRol ? <Resena rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/ListaResenas" element={userRol ? <ListaResenas rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/Cita" element={userRol ? <Cita rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/ListaCitas" element={userRol ? <ListaCitas rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/Tipo_pago" element={userRol ? <Tipo_pago rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/ListaTipoPago" element={userRol ? <ListaTipoPago rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/Tipo_entrega" element={userRol ? <Tipo_entrega rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/ListaTipoEntrega" element={userRol ? <ListaTipoEntrega rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/Estadisticas" element={userRol ? <Estadisticas rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/Reportes_BI" element={userRol ? <Reportes_BI rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/Venta" element={userRol ? <Venta rol={userRol} /> : <Navigate to="/sinacceso" />} />
          <Route path="/sinacceso" element={<SinAcceso />} />
        </Routes>
      </Router>
    );
  }

  export default App;
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import emailjs from "emailjs-com";
import * as XLSX from "xlsx";
import { FaFileExcel } from "react-icons/fa6";
import { FaFileImage } from "react-icons/fa6";
import { FaFileLines } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";
import {
  ButtonGroup,
  Button,
  Row,
  Col,
  Card,
  Container,
} from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Chart from "chart.js/auto";
import "../styles/App.css";
import html2canvas from "html2canvas";
import Footer from "../components/Footer";

function Estadisticas({ rol }) {
  const [productos, setProductos] = useState([]);
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);
  const [top5Productos, setTop5Productos] = useState([]);
  const [top5Clientes, setTop5Clientes] = useState([]);
  const [inversionYBeneficioMes, setInversionYBeneficioMes] = useState([]);
  const [gananciasPorVenta, setGananciasPorVenta] = useState([]);
  const [totalInversionBeneficio, setTotalInversionBeneficio] = useState([]);
  const [gananciaPorGenero, setGananciaPorGenero] = useState([]);
  const [generoClienteCompras, setGeneroClienteCompras] = useState([]);
  const [comprasFisicaOnline, setComprasFisicaOnline] = useState([]);

  function formatearNumeroConComas(numero) {
    const numeroFormateado = Number(numero).toFixed(2);
    return numeroFormateado.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //CORREO DEL GRAFICO PRODUCTOS POR CATEGORIA
  const formatearProductosporCategoria = (productoporcategoria) => {
    return productoporcategoria
      .map((categoria) => {
        return `Categoria: ${categoria.nombre_categoria}\nproducto: ${categoria.CantidadProductos}`;
      })
      .join("\n\n");
  };

  const enviarCorreo = () => {
    // Formateo de datos
    const productoscategiaporFormateadas = formatearProductosporCategoria(
      productosPorCategoria
    );

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      //  to_name: "Oneyker Galeano",
      to_name: "Kenny Tellez",
      //  user_email: "oneygaleano21@gmail.com",
      user_email: "tellezkenny08@gmail.com",
      descripcion: "Top 5 categorías con la mayor cantidad de productos",
      message: productoscategiaporFormateadas,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_yokssdd", "template_zv6swzl", data, "K0tn4YYqxqXzGgXDc")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const exportarAExcel = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(productosPorCategoria);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Productos por categoria"
    );

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "productosporcategoria.xlsx");
  };

  //CORREO DEL GRAFICO TOP 5 CLIENTES
  const formatearTop5Clientes = (top5cliente) => {
    return top5cliente
      .map((hechos_ventas) => {
        return `Nombres y apellidos: ${hechos_ventas.nombre_cliente}
        \n Cantidad de compras: ${hechos_ventas.total_compras}`;
      })
      .join("\n\n");
  };

  const enviarCorreo2 = () => {
    // Formateo de datos
    const top5clientesFormateados = formatearTop5Clientes(top5Clientes);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      to_name: "Kenny",
      user_email: "tellezkenny08@gmail.com",
      message: top5clientesFormateados,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_yokssdd", "template_zv6swzl", data, "K0tn4YYqxqXzGgXDc")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const exportarAExcel2 = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(top5Clientes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Top 5 clientes");

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "top5clientes.xlsx");
  };

  //CORREO DEL GRAFICO INVERSION Y BENEFICIO POR MES
  const formatearInversionYBenefico = (InversionYBeneficio) => {
    return InversionYBeneficio.map((hechos_ventas) => {
      return `Nombre producto: ${hechos_ventas.nombre_producto}
      \n Monto de inversion: ${hechos_ventas.monto_inversion}
      \n Monto de beneficio: ${hechos_ventas.monto_beneficio}
      \n Fecha: ${hechos_ventas.mes} ${hechos_ventas.anio}`;
    }).join("\n\n");
  };

  const enviarCorreo3 = () => {
    // Formateo de datos
    const inversionybeneficioFormateados = formatearInversionYBenefico(
      inversionYBeneficioMes
    );

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      to_name: "Kenny",
      user_email: "tellezkenny08@gmail.com",
      message: inversionybeneficioFormateados,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_yokssdd", "template_zv6swzl", data, "K0tn4YYqxqXzGgXDc")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const exportarAExcel3 = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(inversionYBeneficioMes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Inversion y beneficio al mes"
    );

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "inversionYBeneficioMes.xlsx");
  };

  //CORREO DEL GRAFICO GANACIA POR VENTA
  const formatearGananciaPorventa = (GananciaPorVenta) => {
    return GananciaPorVenta.map((hechos_ventas) => {
      return `Total ganacias: ${hechos_ventas.total_ganancias}
      \n Total cantidad ventas: ${hechos_ventas.total_cantidad_ventas}
      \n Fecha: ${hechos_ventas.mes} ${hechos_ventas.anio}`;
    }).join("\n\n");
  };

  const enviarCorreo4 = () => {
    // Formateo de datos
    const gananciaporventaFormateados =
      formatearGananciaPorventa(gananciasPorVenta);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      to_name: "Kenny",
      user_email: "tellezkenny08@gmail.com",
      message: gananciaporventaFormateados,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_yokssdd", "template_zv6swzl", data, "K0tn4YYqxqXzGgXDc")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const exportarAExcel4 = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(gananciasPorVenta);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ganacias por venta");

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "gananciasPorVenta.xlsx");
  };

  //CORREO DEL GRAFICO TOTAL DE INVERSION Y BENEFICIO
  const formatearTotalInversionyBeneficio = (TotalInversionyBeneficio) => {
    return TotalInversionyBeneficio.map((dim_producto) => {
      return `Total inversion: ${dim_producto.total_inversion}
        \n Total beneficio: ${dim_producto.total_beneficio}`;
    }).join("\n\n");
  };

  const enviarCorreo5 = () => {
    // Formateo de datos
    const totalinversionybeneficioFormateados =
      formatearTotalInversionyBeneficio(totalInversionBeneficio);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      to_name: "Kenny",
      user_email: "tellezkenny08@gmail.com",
      message: totalinversionybeneficioFormateados,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_yokssdd", "template_zv6swzl", data, "K0tn4YYqxqXzGgXDc")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const exportarAExcel5 = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(totalInversionBeneficio);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Total inversion y beneficio"
    );

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "totalInversionBeneficio.xlsx");
  };

  //CORREO DEL GRAFICO TOTAL GANANCIA POR GENERO DE PRODUCTO
  const formatearGananciaPorGenero = (GananciaPorGenero) => {
    return GananciaPorGenero.map((hechos_ventas) => {
      return `Total ganancia: ${hechos_ventas.cantidad_compras}
        \n Monto ganancia: ${hechos_ventas.monto_ganancia}
        \n Fecha: ${hechos_ventas.mes} ${hechos_ventas.anio}`;
    }).join("\n\n");
  };

  const enviarCorreo6 = () => {
    // Formateo de datos
    const gananciaporgeneroFormateados =
      formatearGananciaPorGenero(gananciaPorGenero);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      to_name: "Kenny",
      user_email: "tellezkenny08@gmail.com",
      message: gananciaporgeneroFormateados,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_yokssdd", "template_zv6swzl", data, "K0tn4YYqxqXzGgXDc")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const exportarAExcel6 = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(gananciaPorGenero);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Ganancia por genero de producto"
    );

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "gananciaPorGenero.xlsx");
  };

  //CORREO DEL GRAFICO COMPRAS GENERO CLIENTE
  const formatearCompraGeneroCliente = (generoCliente) => {
    return generoCliente
      .map((hechos_ventas) => {
        return `Genero cliente: ${hechos_ventas.genero_cliente}
        \n Total compras: ${hechos_ventas.total_compras}
        \n Monto total: ${hechos_ventas.monto_total_compras}`;
      })
      .join("\n\n");
  };

  const enviarCorreo7 = () => {
    // Formateo de datos
    const comprasgeneroclienteFormateados =
      formatearCompraGeneroCliente(generoClienteCompras);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      to_name: "Kenny",
      user_email: "tellezkenny08@gmail.com",
      message: comprasgeneroclienteFormateados,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_yokssdd", "template_zv6swzl", data, "K0tn4YYqxqXzGgXDc")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const exportarAExcel7 = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(generoClienteCompras);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Compras por genero de cliente"
    );

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "generoClienteCompras.xlsx");
  };

  //CORREO DEL GRAFICO COMPRAS GENERO CLIENTE
  const formatearComprasFisicaOnline = (FisicaOnline) => {
    return FisicaOnline.map((hechos_ventas) => {
      return `Tipo compra: ${hechos_ventas.tipo_entrega}
        \n Cantidad: ${hechos_ventas.cantidad_comprada}
        \n Monto total: ${hechos_ventas.monto_total}`;
    }).join("\n\n");
  };

  const enviarCorreo8 = () => {
    // Formateo de datos
    const comprasfisicaonlineFormateados =
      formatearComprasFisicaOnline(comprasFisicaOnline);

    // Datos de ejemplo (reemplaza con tus datos reales)
    const data = {
      to_name: "Kenny",
      user_email: "tellezkenny08@gmail.com",
      message: comprasfisicaonlineFormateados,
    };

    // Envía el correo utilizando EmailJS
    emailjs
      .send("service_yokssdd", "template_zv6swzl", data, "K0tn4YYqxqXzGgXDc")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const exportarAExcel8 = () => {
    // Convertir los datos JSON a una hoja de trabajo de Excel
    const worksheet = XLSX.utils.json_to_sheet(comprasFisicaOnline);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Compras en fisico y online"
    );

    // Generar y descargar el archivo Excel
    XLSX.writeFile(workbook, "comprasFisicaOnline.xlsx");
  };

  useEffect(() => {
    fetch("http://localhost:5000/crud/read_producto")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) =>
        console.error("Error al obtener los productos:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crud/ProductosPorCategoria")
      .then((response) => response.json())
      .then((data) => setProductosPorCategoria(data))
      .catch((error) =>
        console.error("Error al obtener los productos por categoria", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crud2/top5Productos")
      .then((response) => response.json())
      .then((data) => setTop5Productos(data))
      .catch((error) => 
        console.error("Error al obtener los top 5 productos:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crud2/top5Clientes")
      .then((response) => response.json())
      .then((data) => setTop5Clientes(data))
      .catch((error) =>
        console.error("Error al obtener los top 5 clientes:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crud2/InversionYBeneficioMes")
      .then((response) => response.json())
      .then((data) => setInversionYBeneficioMes(data))
      .catch((error) =>
        console.error(
          "Error al obtener la inversión y beneficio por mes:",
          error
        )
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crud2/GananciasPorVenta")
      .then((response) => response.json())
      .then((data) => setGananciasPorVenta(data))
      .catch((error) =>
        console.error("Error al obtener las ganancias por venta:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crud2/Total_InvercionBeneficio")
      .then((response) => response.json())
      .then((data) => setTotalInversionBeneficio(data))
      .catch((error) =>
        console.error("Error al obtener la inversión y beneficio total:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crud2/GananciaPorGenero")
      .then((response) => response.json())
      .then((data) => setGananciaPorGenero(data))
      .catch((error) =>
        console.error("Error al obtener la ganancia por género:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crud2/GeneroClienteCompras")
      .then((response) => response.json())
      .then((data) => setGeneroClienteCompras(data))
      .catch((error) =>
        console.error(
          "Error al obtener las compras por género de cliente:",
          error
        )
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/crud2/Compras_FisicaOnline")
      .then((response) => response.json())
      .then((data) => setComprasFisicaOnline(data))
      .catch((error) =>
        console.error("Error al obtener las compras físicas y online:", error)
      );
  }, []);

  useEffect(() => {
    if (productosPorCategoria.length > 0) {
      const ctx = document.getElementById("myCategories");
  
      // Limitar a las primeras 5 categorías
      const topCategorias = productosPorCategoria.slice(0, 5);
  
      const labels = topCategorias.map(
        (categoria) => categoria.nombre_categoria
      );
      const data = topCategorias.map(
        (categoria) => categoria.CantidadProductos
      );
  
      const existingChart = Chart.getChart("myCategories");
      if (existingChart) {
        existingChart.destroy();
      }
  
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Cantidad de productos por categoria",
              data: data,
              backgroundColor: [
                "rgba(255,99,132,0.5)",
                "rgba(54,162,235,0.5)",
                "rgba(255,206,86,0.5)",
                "rgba(75,192,192,0.5)",
                "rgba(153,102,255,0.5)",
                "rgba(255,159,64,0.5)",
              ],
              borderColor: [
                "rgba(255,99,132,0.5)",
                "rgba(54,162,235,0.5)",
                "rgba(255,206,86,0.5)",
                "rgba(75,192,192,0.5)",
                "rgba(153,102,255,0.5)",
                "rgba(255,159,64,0.5)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Cantidad de productos por categoria",
            },
          },
        },
      });
    }
  }, [productosPorCategoria]);
  

  useEffect(() => {
    if (top5Productos.length > 0) {
      const ctx = document.getElementById("top5Productos");

      const labels = top5Productos.map((producto) => producto.nombre_producto);
      const data = top5Productos.map((producto) => producto.total_vendido);

      const existingChart = Chart.getChart("top5Productos");
      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Top 5 Productos Más Vendidos",
              data: data,
              backgroundColor: "rgba(75,192,192,0.5)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [top5Productos]);

  useEffect(() => {
    if (top5Clientes.length > 0) {
      const ctx = document.getElementById("top5Clientes");
  
      // Limitar a los primeros 5 clientes
      const topClientes = top5Clientes.slice(0, 5);
  
      const labels = topClientes.map((cliente) => cliente.nombre_cliente);
      const data = topClientes.map((cliente) => cliente.total_compras);
  
      const existingChart = Chart.getChart("top5Clientes");
      if (existingChart) {
        existingChart.destroy();
      }
  
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Top 5 Clientes con Más Compras",
              data: data,
              backgroundColor: "rgba(153,102,255,0.5)",
              borderColor: "rgba(153,102,255,1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [top5Clientes]);
  

  useEffect(() => {
    if (inversionYBeneficioMes.length > 0) {
      const ctx = document.getElementById("inversionYBeneficioMes");
  
      // Limitar a los primeros 5 productos
      const topProductos = inversionYBeneficioMes.slice(0, 5);
  
      const labels = topProductos.map(
        (item) => `${item.nombre_producto} - ${item.mes}/${item.anio}`
      );
      const inversionData = topProductos.map((item) => item.monto_inversion);
      const beneficioData = topProductos.map((item) => item.monto_beneficio);
  
      const existingChart = Chart.getChart("inversionYBeneficioMes");
      if (existingChart) {
        existingChart.destroy();
      }
  
      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Monto de Inversión",
              data: inversionData,
              backgroundColor: "rgba(255,99,132,0.5)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
            },
            {
              label: "Monto de Beneficio",
              data: beneficioData,
              backgroundColor: "rgba(54,162,235,0.5)",
              borderColor: "rgba(54,162,235,1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [inversionYBeneficioMes]);
  

  useEffect(() => {
    if (gananciasPorVenta.length > 0) {
      const ctx = document.getElementById("gananciasPorVenta");

      const labels = gananciasPorVenta.map(
        (item) => `${item.mes}/${item.anio}`
      );
      const gananciasData = gananciasPorVenta.map(
        (item) => item.total_ganancias
      );
      const ventasData = gananciasPorVenta.map(
        (item) => item.total_cantidad_ventas
      );

      const existingChart = Chart.getChart("gananciasPorVenta");
      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Total Ganancias",
              data: gananciasData,
              backgroundColor: "rgba(255,159,64,0.5)",
              borderColor: "rgba(255,159,64,1)",
              borderWidth: 1,
            },
            {
              label: "Total Cantidad de Ventas",
              data: ventasData,
              backgroundColor: "rgba(75,192,192,0.5)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [gananciasPorVenta]);

  useEffect(() => {
    if (totalInversionBeneficio.length > 0) {
      const ctx = document.getElementById("totalInversionBeneficio");

      const labels = ["Total Inversión", "Total Beneficio"];
      const data = [
        totalInversionBeneficio[0].total_inversion,
        totalInversionBeneficio[0].total_beneficio,
      ];

      const existingChart = Chart.getChart("totalInversionBeneficio");
      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Inversión y Beneficio Total",
              data: data,
              backgroundColor: ["rgba(255,99,132,0.5)", "rgba(54,162,235,0.5)"],
              borderColor: ["rgba(255,99,132,1)", "rgba(54,162,235,1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Inversión y Beneficio Total",
            },
          },
        },
      });
    }
  }, [totalInversionBeneficio]);

  useEffect(() => {
    if (gananciaPorGenero.length > 0) {
      const ctx = document.getElementById("gananciaPorGenero");

      const labels = gananciaPorGenero.map(
        (item) => `${item.genero_producto} - ${item.mes}/${item.anio}`
      );
      const cantidadData = gananciaPorGenero.map(
        (item) => item.cantidad_compras
      );
      const gananciaData = gananciaPorGenero.map((item) => item.monto_ganancia);

      const existingChart = Chart.getChart("gananciaPorGenero");
      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Cantidad de Compras",
              data: cantidadData,
              backgroundColor: "rgba(153,102,255,0.5)",
              borderColor: "rgba(153,102,255,1)",
              borderWidth: 1,
            },
            {
              label: "Monto de Ganancia",
              data: gananciaData,
              backgroundColor: "rgba(75,192,192,0.5)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [gananciaPorGenero]);

  useEffect(() => {
    if (generoClienteCompras.length > 0) {
      const ctx = document.getElementById("generoClienteCompras");

      const labels = generoClienteCompras.map((item) => item.genero_cliente);
      const comprasData = generoClienteCompras.map(
        (item) => item.total_compras
      );
      const montoData = generoClienteCompras.map(
        (item) => item.monto_total_compras
      );

      const existingChart = Chart.getChart("generoClienteCompras");
      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Total Compras",
              data: comprasData,
              backgroundColor: "rgba(255,99,132,0.5)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
            },
            {
              label: "Monto Total Compras",
              data: montoData,
              backgroundColor: "rgba(54,162,235,0.5)",
              borderColor: "rgba(54,162,235,1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [generoClienteCompras]);

  useEffect(() => {
    if (comprasFisicaOnline.length > 0) {
      const ctx = document.getElementById("comprasFisicaOnline");

      const labels = comprasFisicaOnline.map((item) => item.tipo_entrega);
      const cantidadData = comprasFisicaOnline.map(
        (item) => item.cantidad_comprada
      );
      const montoData = comprasFisicaOnline.map((item) => item.monto_total);

      const existingChart = Chart.getChart("comprasFisicaOnline");
      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Cantidad Comprada",
              data: cantidadData,
              backgroundColor: "rgba(255,206,86,0.5)",
              borderColor: "rgba(255,206,86,1)",
              borderWidth: 1,
            },
            {
              label: "Monto Total",
              data: montoData,
              backgroundColor: "rgba(75,192,192,0.5)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [comprasFisicaOnline]);

  const generarReporteProductosporCategoria = () => {
    fetch("http://localhost:5000/crud/ProductosPorCategoria")
      .then((response) => response.json())
      .then((cantidadproducto) => {
        console.log("Productos por Categoria:", cantidadproducto);

        const doc = new jsPDF();
        doc.text("Reporte Productos por Categoria", 20, 10);

        const headers = [["Categoria", "Cantidad de Producto"]];
        const data = cantidadproducto.map((cantidadesproducto) => [
          cantidadesproducto.nombre_categoria,
          cantidadesproducto.CantidadProductos,
        ]);

        try {
          doc.autoTable({
            startY: 20,
            head: headers,
            body: data,
            theme: "striped",
            margin: { top: 15 },
          });

          doc.save("productosporcategoria.pdf");
          console.log("Documento PDF generado y descargado.");
        } catch (error) {
          console.error("Error al generar el PDF con autoTable:", error);
        }
      })
      .catch((error) => console.error("Error al obtener el stock:", error));
  };

  const generarReporteTop5Clientes = () => {
    fetch("http://localhost:5000/crud2/top5Clientes")
      .then((response) => response.json())
      .then((hechos_ventas) => {
        console.log("Top 5 clientes:", hechos_ventas);

        const doc = new jsPDF();
        doc.text("Top 5 clientes con mas compras", 20, 10);

        const headers = [["Nombres y apellidos", "Cantidad de compras"]];
        const data = hechos_ventas.map((nombre_cliente) => [
          nombre_cliente.nombre_cliente,
          nombre_cliente.total_compras,
        ]);

        try {
          doc.autoTable({
            startY: 20,
            head: headers,
            body: data,
            theme: "striped",
            margin: { top: 15 },
          });

          doc.save("productosporcategoria.pdf");
          console.log("Documento PDF generado y descargado.");
        } catch (error) {
          console.error("Error al generar el PDF con autoTable:", error);
        }
      })
      .catch((error) => console.error("Error al obtener el stock:", error));
  };

  const generarReporteInversionYBeneficioMes = () => {
    fetch("http://localhost:5000/crud2/InversionYBeneficioMes")
      .then((response) => response.json())
      .then((hechos_ventas) => {
        console.log("Inversion y benefico al mes:", hechos_ventas);

        const doc = new jsPDF();
        doc.text("Inversion y benefico al mes", 20, 10);

        const headers = [
          ["Nombres producto", "Inversion", "Beneficio", "Mes", "Año"],
        ];
        const data = hechos_ventas.map((nombre_producto) => [
          nombre_producto.nombre_producto,
          nombre_producto.monto_inversion,
          nombre_producto.monto_beneficio,
          nombre_producto.mes,
          nombre_producto.anio,
        ]);

        try {
          doc.autoTable({
            startY: 20,
            head: headers,
            body: data,
            theme: "striped",
            margin: { top: 15 },
          });

          doc.save("productosporcategoria.pdf");
          console.log("Documento PDF generado y descargado.");
        } catch (error) {
          console.error("Error al generar el PDF con autoTable:", error);
        }
      })
      .catch((error) => console.error("Error al obtener el stock:", error));
  };

  const generarReporteGananciaPorventa = () => {
    fetch("http://localhost:5000/crud2/GananciasPorVenta")
      .then((response) => response.json())
      .then((hechos_ventas) => {
        console.log("Ganancia por venta:", hechos_ventas);

        const doc = new jsPDF();
        doc.text("Ganacia por venta", 20, 10);

        const headers = [
          ["Total ganancia", "Total cantidad de ventas", "Mes", "Año"],
        ];
        const data = hechos_ventas.map((ganancias) => [
          ganancias.total_ganancias,
          ganancias.total_cantidad_ventas,
          ganancias.mes,
          ganancias.anio,
        ]);

        try {
          doc.autoTable({
            startY: 20,
            head: headers,
            body: data,
            theme: "striped",
            margin: { top: 15 },
          });

          doc.save("productosporcategoria.pdf");
          console.log("Documento PDF generado y descargado.");
        } catch (error) {
          console.error("Error al generar el PDF con autoTable:", error);
        }
      })
      .catch((error) => console.error("Error al obtener el stock:", error));
  };

  const generarReporteTotalInversionBeneficio = () => {
    fetch("http://localhost:5000/crud2/Total_InvercionBeneficio")
      .then((response) => response.json())
      .then((dim_producto) => {
        console.log("Total de inversion y beneficio:", dim_producto);

        const doc = new jsPDF();
        doc.text("Total de inversion y beneficio", 20, 10);

        const headers = [["Total inversion", "Total beneficio"]];
        const data = dim_producto.map((totalIB) => [
          totalIB.total_inversion,
          totalIB.total_beneficio,
        ]);

        try {
          doc.autoTable({
            startY: 20,
            head: headers,
            body: data,
            theme: "striped",
            margin: { top: 15 },
          });

          doc.save("productosporcategoria.pdf");
          console.log("Documento PDF generado y descargado.");
        } catch (error) {
          console.error("Error al generar el PDF con autoTable:", error);
        }
      })
      .catch((error) => console.error("Error al obtener el stock:", error));
  };

  const generarReporteGananciaPorGenero = () => {
    fetch("http://localhost:5000/crud2/GananciaPorGenero")
      .then((response) => response.json())
      .then((hechos_ventas) => {
        console.log("Total de ganancia por genero de producto:", hechos_ventas);

        const doc = new jsPDF();
        doc.text("Total de ganancia por genero de producto", 20, 10);

        const headers = [
          ["Fecha", "Genero", "Cantidad compras", "Monto ganancia"],
        ];
        const data = hechos_ventas.map((totalGP) => [
          totalGP.mes + "/" + totalGP.anio,
          totalGP.genero_producto,
          totalGP.cantidad_compras,
          totalGP.monto_ganancia,
        ]);

        try {
          doc.autoTable({
            startY: 20,
            head: headers,
            body: data,
            theme: "striped",
            margin: { top: 15 },
          });

          doc.save("productosporcategoria.pdf");
          console.log("Documento PDF generado y descargado.");
        } catch (error) {
          console.error("Error al generar el PDF con autoTable:", error);
        }
      })
      .catch((error) => console.error("Error al obtener el stock:", error));
  };

  const generarReporteGeneroClienteCompras = () => {
    fetch("http://localhost:5000/crud2/GeneroClienteCompras")
      .then((response) => response.json())
      .then((hechos_ventas) => {
        console.log("Compras por genero de cliente:", hechos_ventas);

        const doc = new jsPDF();
        doc.text("Compras por genero de cliente", 20, 10);

        const headers = [["Genero cliente", "Total compras", "Monto total"]];
        const data = hechos_ventas.map((gananciaGC) => [
          gananciaGC.genero_cliente,
          gananciaGC.total_compras,
          gananciaGC.monto_total_compras,
        ]);

        try {
          doc.autoTable({
            startY: 20,
            head: headers,
            body: data,
            theme: "striped",
            margin: { top: 15 },
          });

          doc.save("productosporcategoria.pdf");
          console.log("Documento PDF generado y descargado.");
        } catch (error) {
          console.error("Error al generar el PDF con autoTable:", error);
        }
      })
      .catch((error) => console.error("Error al obtener el stock:", error));
  };

  const generarReporteComprasFisicaOnline = () => {
    fetch("http://localhost:5000/crud2/Compras_FisicaOnline")
      .then((response) => response.json())
      .then((hechos_ventas) => {
        console.log("Compras en tienda y online:", hechos_ventas);

        const doc = new jsPDF();
        doc.text("Compras en tienda y online", 20, 10);

        const headers = [["Tipo compra", "Cantidad", "Monto total"]];
        const data = hechos_ventas.map((gananciaTO) => [
          gananciaTO.tipo_entrega,
          gananciaTO.cantidad_comprada,
          gananciaTO.monto_total,
        ]);

        try {
          doc.autoTable({
            startY: 20,
            head: headers,
            body: data,
            theme: "striped",
            margin: { top: 15 },
          });

          doc.save("productosporcategoria.pdf");
          console.log("Documento PDF generado y descargado.");
        } catch (error) {
          console.error("Error al generar el PDF con autoTable:", error);
        }
      })
      .catch((error) => console.error("Error al obtener el stock:", error));
  };

  const handleDownloadPDF = (canvasId) => {
    const captureElement = document.getElementById(canvasId);

    if (captureElement) {
      html2canvas(captureElement, { scrollY: -window.scrollY }).then(
        (canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save("Estadisticas.pdf");
        }
      );
    }
  };

  return (
    <>
      <Header rol={rol} />
      <Container
        style={{
          backgroundColor: "#303030",
          minHeight: "100vh",
          paddingTop: "70px",
          marginTop: "30px",
        }}
        className="espaciado"
        fluid
      >
        <Row>
          <Col className="title">
            <h1 style={{ color: "#ffff" }}>Estadísticas de Productos</h1>
          </Col>
        </Row>

        <div>
          <Row className="mt-4">
            <Col md={6}>
              <Card>
                <Card.Header>Productos por Categoría</Card.Header>
                <Card.Body>
                  <canvas id="myCategories" width="100%" height="100%"></canvas>
                </Card.Body>
                <Row className= "mt-2">
                  <Col className="text-center">
                    <Button
                      className="botongraf"
                      onClick={() => handleDownloadPDF("myCategories")}
                    >
                      <FaFileImage style={{ color: "white" }} />
                    </Button>
                    <Button
                      className="botongraf"
                      onClick={generarReporteProductosporCategoria}
                    >
                      <FaFileLines style={{ color: "white" }} />
                    </Button>
                    <Button className="botongraf" onClick={enviarCorreo}>
                      <MdAttachEmail style={{ color: "white" }} />
                    </Button>
                    <Button 
                    onClick={exportarAExcel}>
                      <FaFileExcel style={{ color: "white" }} />
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col md={6}>
              <Card>
                <Card.Header>Top 5 Clientes</Card.Header>
                <Card.Body>
                  <canvas id="top5Clientes" width="100%" height="100%"></canvas>
                </Card.Body>
                <Row className="mt-2">
                  <Col className="text-center">
                    <Button
                      className="botongraf"
                      onClick={() => handleDownloadPDF("top5Clientes")}
                    >
                      <FaFileImage style={{ color: "white" }} />
                    </Button>
                    <Button
                      className="botongraf"
                      onClick={generarReporteTop5Clientes}
                    >
                      <FaFileLines style={{ color: "white" }} />
                    </Button>
                    <Button className="botongraf" onClick={enviarCorreo2}>
                      <MdAttachEmail style={{ color: "white" }} />
                    </Button>
                    <Button onClick={exportarAExcel2}>
                      <FaFileExcel style={{ color: "white" }} />
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card>
                <Card.Header>Inversión y Beneficio por Mes</Card.Header>
                <Card.Body>
                  <canvas
                    id="inversionYBeneficioMes"
                    width="100%"
                    height="100%"
                  ></canvas>
                </Card.Body>
                <Row className="mt-2">
                  <Col className="text-center">
                    <Button
                      className="botongraf"
                      onClick={() =>
                        handleDownloadPDF("inversionYBeneficioMes")
                      }
                    >
                      <FaFileImage style={{ color: "white" }} />
                    </Button>
                    <Button
                      className="botongraf"
                      onClick={generarReporteInversionYBeneficioMes}
                    >
                      <FaFileLines style={{ color: "white" }} />
                    </Button>
                    <Button className="botongraf" onClick={enviarCorreo3}>
                      <MdAttachEmail style={{ color: "white" }} />
                    </Button>
                    <Button onClick={exportarAExcel3}>
                      <FaFileExcel style={{ color: "white" }} />
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col md={6}>
              <Card>
                <Card.Header>Ganancias por Venta</Card.Header>
                <Card.Body>
                  <canvas
                    id="gananciasPorVenta"
                    width="100%"
                    height="100%"
                  ></canvas>
                </Card.Body>
                <Row className="mt-4">
                  <Col className="text-center">
                    <Button
                      className="botongraf"
                      onClick={() => handleDownloadPDF("gananciasPorVenta")}
                    >
                      <FaFileImage style={{ color: "white" }} />
                    </Button>
                    <Button
                      className="botongraf"
                      onClick={generarReporteGananciaPorventa}
                    >
                      <FaFileLines style={{ color: "white" }} />
                    </Button>
                    <Button className="botongraf" onClick={enviarCorreo4}>
                      <MdAttachEmail style={{ color: "white" }} />
                    </Button>
                    <Button onClick={exportarAExcel4}>
                      <FaFileExcel style={{ color: "white" }} />
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={6}>
              <Card>
                <Card.Header>Inversión y Beneficio Total</Card.Header>
                <Card.Body>
                  <canvas
                    id="totalInversionBeneficio"
                    width="100%"
                    height="100%"
                  ></canvas>
                </Card.Body>
                <Row className="mt-4">
                  <Col className="text-center">
                    <Button
                      className="botongraf"
                      onClick={() =>
                        handleDownloadPDF("totalInversionBeneficio")
                      }
                    >
                      <FaFileImage style={{ color: "white" }} />
                    </Button>
                    <Button
                      className="botongraf"
                      onClick={generarReporteTotalInversionBeneficio}
                    >
                      <FaFileLines style={{ color: "white" }} />
                    </Button>
                    <Button className="botongraf" onClick={enviarCorreo5}>
                      <MdAttachEmail style={{ color: "white" }} />
                    </Button>
                    <Button onClick={exportarAExcel5}>
                      <FaFileExcel style={{ color: "white" }} />
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col md={6}>
              <Card>
                <Card.Header>Ganancia por Género</Card.Header>
                <Card.Body>
                  <canvas
                    id="gananciaPorGenero"
                    width="100%"
                    height="100%"
                  ></canvas>
                </Card.Body>
                <Row className="mt-4">
                  <Col className="text-center">
                    <Button
                      className="botongraf"
                      onClick={() => handleDownloadPDF("gananciaPorGenero")}
                    >
                      <FaFileImage style={{ color: "white" }} />
                    </Button>
                    <Button
                      className="botongraf"
                      onClick={generarReporteGananciaPorGenero}
                    >
                      <FaFileLines style={{ color: "white" }} />
                    </Button>
                    <Button className="botongraf" onClick={enviarCorreo6}>
                      <MdAttachEmail style={{ color: "white" }} />
                    </Button>
                    <Button onClick={exportarAExcel6}>
                      <FaFileExcel style={{ color: "white" }} />
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={6}>
              <Card>
                <Card.Header>Compras por Género de Cliente</Card.Header>
                <Card.Body>
                  <canvas
                    id="generoClienteCompras"
                    width="100%"
                    height="100%"
                  ></canvas>
                  <Row className="mt-4">
                    <Col className="text-center">
                      <Button
                        className="botongraf"
                        onClick={() =>
                          handleDownloadPDF("generoClienteCompras")
                        }
                      >
                        <FaFileImage style={{ color: "white" }} />
                      </Button>
                      <Button
                        className="botongraf"
                        onClick={generarReporteGeneroClienteCompras}
                      >
                        <FaFileLines style={{ color: "white" }} />
                      </Button>
                      <Button className="botongraf" onClick={enviarCorreo7}>
                        <MdAttachEmail style={{ color: "white" }} />
                      </Button>
                      <Button onClick={exportarAExcel7}>
                        <FaFileExcel style={{ color: "white" }} />
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card>
                <Card.Header>Compras Físicas vs. Online</Card.Header>
                <Card.Body>
                  <canvas
                    id="comprasFisicaOnline"
                    width="100%"
                    height="100%"
                  ></canvas>
                  <Row className="mt-4">
                    <Col className="text-center">
                      <Button
                        className="botongraf"
                        onClick={() => handleDownloadPDF("comprasFisicaOnline")}
                      >
                        <FaFileImage style={{ color: "white" }} />
                      </Button>

                      <Button
                        className="botongraf"
                        onClick={generarReporteComprasFisicaOnline}
                      >
                        <FaFileLines style={{ color: "white" }} />
                      </Button>
                      <Button className="botongraf" onClick={enviarCorreo8}>
                        <MdAttachEmail style={{ color: "white" }} />
                      </Button>

                      <Button onClick={exportarAExcel8}>
                        <FaFileExcel style={{ color: "white" }} />
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Estadisticas;

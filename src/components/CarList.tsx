import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

type Car = {
  id: number;
  name: string;
  brand: string;
  model: string;
  patent: string;
  price: number;
};

function CarList({ carList }: any) {
  const [cars, setCars] = useState<Car[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  const totalPaginas = Math.ceil(cars.length / elementosPorPagina);

  const indiceInicio = (paginaActual - 1) * elementosPorPagina;
  const indiceFinal = indiceInicio + elementosPorPagina;
  const datosPagina = cars.slice(indiceInicio, indiceFinal);

  // useEffect(() =>{
  //   fetch('http://localhost:3000/api/cars/list')
  //   .then(res => res.json())
  //   .then(data => setCars(data))
  //   .catch(err => console.error('Error al conectar a la base de datos'))
  // },
  // []
  // )

  useEffect(() => {
    setCars(carList);
  }, [carList]);

  const cambiarPagina = (nuevaPagina: number) => {
    setPaginaActual(nuevaPagina);
  };

  const deleteCar = async (id: number) => {
    const confirmar = window.confirm("¿Eliminar este auto?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:3000/api/cars/${id}`);
      setCars((prev) => prev.filter((car) => car.id !== id));
    } catch (error) {
      console.error("Error al eliminar auto:", error);
    }
  };

  return (
    <div
      style={{ width: "60%", height: "40%", overflowY: "auto" }}
      className=""
    >
      <h2 style={{ fontFamily: "monospace" }}>Lista autos rentados</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rut vendedor</th>
            <th>Patente vehiculo</th>
            <th>Marca vehiculo</th>
            <th>Modelo vehiculo</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {datosPagina.map((u: any) => (
            <tr key={u.id}>
              <td style={{ width: "20%", textAlign: "center" }}>{u.name}</td>
              <td style={{ width: "10%", textAlign: "center" }}>{u.dni}</td>
              <td style={{ width: "10%", textAlign: "center" }}>{u.patent}</td>
              <td style={{ width: "10%", textAlign: "center" }}>{u.brand}</td>
              <td style={{ width: "10%", textAlign: "center" }}>{u.model}</td>
              <td style={{ width: "5%", textAlign: "center" }}>
                <FaRegTrashAlt
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => deleteCar(u.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => cambiarPagina(num)}
              style={{
                margin: "0 4px",
                fontWeight: num === paginaActual ? "bold" : "normal",
              }}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarList;

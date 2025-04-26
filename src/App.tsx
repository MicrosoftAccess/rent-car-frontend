import "./App.css";

import CarList from "./components/CarList";
import CarForm from "./components/CarForm";

import useSoapData from "./hooks/useSoapData";
function App() {
  const { data, loading, error } = useSoapData();

  if (error) return <div>error...</div>;

  return (
    <div
      className="main-div"
      style={{ display: "flex", flexDirection: "column", gap: "70px", padding: "20px"}}
      >
      <CarForm/>
      <h1>Respuesta del Servicio SOAP</h1>
      {loading ? <p>Cargando...</p> : <CarList carList={data.cars}/>}
    </div>
  );
}

export default App;

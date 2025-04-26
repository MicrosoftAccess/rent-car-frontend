// src/hooks/useSoapData.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useSoapData = (): any => {
  const [data, setData] = useState(null);      // Para guardar los datos del servicio
  const [loading, setLoading] = useState(true); // Para mostrar un spinner o mensaje de carga
  const [error, setError] = useState(null);     // Para manejar errores

  useEffect(() => {
    const getAllCars = async () =>  {
        try {
            const { data } = await axios.get<any>("http://localhost:3000/api/cars/carsSOAP");
            setData(data);
        } catch (err: any) {
            setError(err.message); 
            setLoading(false); 
        } finally {
        setLoading(false);
      } 
    };

    getAllCars();
  }, []);

  return { data, loading, error };
};

export default useSoapData;

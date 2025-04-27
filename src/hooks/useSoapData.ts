// src/hooks/useSoapData.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useSoapData = (): any => {
  const [data, setData] = useState(null);      // To save the service data
  const [loading, setLoading] = useState(true); // show a loading message
  const [error, setError] = useState(null);     // to manage errors

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

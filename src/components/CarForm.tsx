import styled from 'styled-components';
import '../index.css'
import axios from 'axios';
import { useForm } from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// yup schema to validate form
const schema = yup.object({
    name: yup.string().required("El nombre es obligatorio"),
    dni: yup.number().typeError("Debe ser un número").integer().required("El DNI es obligatorio"),
    patent: yup.string().required("Debes colocar la patente del vehículo"),
    brand: yup.string().required("Debes seleccionar una marca de vehículo"),
    model: yup.string().required("Debes seleccionar una modelo de vehículo"),
    price: yup.number().required("Debe de colocar el precio del vehículo"),
  });

// input style  
const Input = styled.input`
  padding: 15px;
	border: 1px solid #ccc;
	border-radius: 3px;
	margin-bottom: 10px;
	width: 100%;
	box-sizing: border-box;
	font-family: montserrat;
	color: #2C3E50;
	font-size: 13px;
`;

const Button = styled.button`
   background-color: #0047FF; /* azul intenso */
  color: white;
  padding: 10px 40px;
  border: none;
  border-radius: 999px; /* forma ovalada */
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;




function CarForm() {
    // options for the dropdown
    const modelOptions = [
        { label: "Sedan", value: "Sedan" },
        { label: "Hatchback", value: "Hatchback" },
        { label: "SUV", value: "SUV" },
        { label: "Deportivo", value: "Deportivo" },
        { label: "Pickup", value: "Pickup" },
    ];
    
    const brandOptions = [
        { label: "Toyota", value: "Toyota" },
        { label: "Hyundai", value: "Hyundai" },
        { label: "Kia", value: "Kia" },
        { label: "Nissan", value: "Nissan" },
        { label: "Chevrolet", value: "Chevrolet" },
    ];

    // react hook form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

  
    // sends the form to create a new car
    const onSubmit = async (data: any) => {
        try {
            const payload = { // transforms the dni and price value to string
                ...data,
                dni: parseInt(data.dni.toString(), 10),
                price: parseInt(data.price.toString())
            }
            await axios.post('http://localhost:3000/api/cars', payload);
            window.location.reload();
            reset();
        } catch (error) {
            console.log('Error al enviar el formulario:', error)
        }
    }

 
    return (
        <div style={{ 'width': '50%', 'height': '50%', border: '1px solid black', padding: '20px 0px 20px 0px', borderRadius: '20px',backgroundColor:'white'}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h2 style={{ margin: '0px 0px 0px 30px', fontFamily:'monospace' }}>Datos del vendedor:</h2>
                </div>
                <div className='flex-row container-up'>
                    <div className='top-inputs item' style={{margin:'0px 30px 0px 30px'}} >
                        <div style={{display:'flex'}}>
                            <label htmlFor="">Nombre completo </label><span style={{color:'red'}}>*</span> 
                        </div>
                        {errors.name ? <Input {...register("name", { valueAsNumber: true } ) } style={{border:'1px solid red'}} /> : <Input {...register("name", { valueAsNumber: true })} />}
                        
                   </div>
                    <div className='top-inputs' style={{margin:'0px 30px 0px 30px'}}>
                        <div>
                            <label htmlFor="">Rut Vendedor</label><span style={{color:'red'}}>*</span> 
                        </div>

                        {errors.dni ?  <Input {...register("dni", { valueAsNumber: true })} style={{border:'1px solid red'}}/> : <Input {...register("dni", { valueAsNumber: true })} />}
                        
                    </div>
                </div>
                <div className="divider"></div>
                <div>

                    <h2 style={{ margin: '0px 0px 0px 30px',fontFamily:'monospace'  }}>Datos del vehiculo:</h2>
                </div>
                <div style={{margin:'0px 30px 0px 30px'}} className='flex-row container-form'>

                    <div className='item'>
                        <div className='top-inputs'>
                            <label htmlFor="">Patente vehiculo <span style={{color:'red'}}>*</span> </label>
                        </div>
                        {errors.patent ? <Input {...register("patent")} style={{border:'1px solid red'}}/> : <Input {...register("patent")} />}
                    </div>
                    <div className='item'>
                        <div className='top-inputs'>
                            <label htmlFor="">Marca del vehiculo<span style={{color:'red'}}>*</span> </label>
                        </div>
                        {errors.model ? <select {...register("brand")} style={{width:'100',border:'1px solid red'}} className='dropdown'>
                        {brandOptions.map((opcion) => (
                                <option key={opcion.value} value={opcion.value}>
                                    {opcion.label}
                                </option>
                            ))}
                        </select> : <select {...register("brand")} style={{width:'100'}} className='dropdown'>
                        {brandOptions.map((opcion) => (
                                <option key={opcion.value} value={opcion.value}>
                                    {opcion.label}
                                </option>
                            ))}
                        </select>} 

                    </div>
                    <div className='item'>
                        <div className='top-inputs'>
                            <label  htmlFor="">Modelo del vehiculo<span style={{color:'red'}}>*</span> </label>
                        </div>
                        <select {...register("model")} className='dropdown'>
                            {modelOptions.map((opcion) => (
                                <option key={opcion.value} value={opcion.value}>
                                    {opcion.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='container-form'>
                    <div className='item' style={{margin:'0px 300px 0px 30px'}}>
                        <div className='top-inputs'>
                            <label htmlFor="">Precio del vehiculo<span style={{color:'red'}}>*</span></label>
                        </div>
                        {errors.price ? <Input {...register("price", { valueAsNumber: true })} style={{border:'1px solid red'}}/> : <Input {...register("price", { valueAsNumber: true })} />}
                    </div>
                    <div className='item'>

                    </div>
                    <div className='item'>

                    </div>
                </div>
                <div className="divider"></div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '0px 20px 0px 0px' }}>
                    <Button>Enviar</Button>
                </div>
            </form>
        </div>
    )
}

export default CarForm
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CarForm from './components/CarForm.tsx'
import CarList from './components/CarList.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "",
    element: <div style={{width:'100%',height:'100%',justifyContent:'center',display:'flex',alignItems:'center'}}>
      <CarForm></CarForm></div>,
  },
  {
    path: "/car-list",
    element: <div style={{width:'100%',height:'100%',justifyContent:'center',display:'flex',alignItems:'center'}}><App/></div>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <RouterProvider router={router} />
  </StrictMode>,
)

import { useState, useEffect} from "react";
import LayoutPublic from "../Layout/LayoutPublic";
import Formulario from "../Pages/IngresarSolicitud";
import AprobarSolicitud from "../Pages/AprobarSolicitud";
import Inicio from "../Pages/Inicio";
import NotFound from "../Pages/NotFound";


{/*

Aqui es el componente que maneja la navegacion de la pagina.
Se llama a todos los componentes de la carpeta "PAGES"
*/}





import { Routes, Route } from "react-router-dom";
import SolicitudesRechazadas from "../Pages/SolicitudesRechazadas";


const App = () => {
    const [data, setData] = useState([]);
    
    // Cargamos los datos guardados al iniciar la página
  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

    // Guardamos los datos actualizados cada vez que cambien
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(data));
  }, [data]);

  const handleFormSubmit = (values) => {
    setData((prevData) => [...prevData, values]);
  };

  const handleClearData = () => {
    setData([]);
    localStorage.removeItem('formData');
  };


  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutPublic/>}>
            <Route path="/" element={<Inicio />} />
            <Route path="/memosuplencia" element={<Formulario onSubmit={handleFormSubmit} />} />
            <Route path="/aprobarsolicitud" element={<AprobarSolicitud data={data} setData={setData} onClearData={handleClearData}/>}/>
            <Route path="/rechazadas" element={<SolicitudesRechazadas/>}   />
            <Route path="/*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
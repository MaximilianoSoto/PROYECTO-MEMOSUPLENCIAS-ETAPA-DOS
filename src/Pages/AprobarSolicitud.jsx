import {useState, useEffect} from "react"
import AprobarModal from "./AprobarModal"
import DetallesModal from "./DetallesModal";
import RechazarModal from "./RechazarModal";


const AprobarSolicitud = ({data,setData, onClearData, }) => {
    
    //Estado para el boton ver 
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    //Estado para el boton de aprbacion 
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    // Estado para el boton de rechazar
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showRechazarModal, setShowRechazarModal] = useState(false);
    // Estado para los circulos de la colunma en "progeso"
    const [progress, setProgress] = useState(data.map(() => 0));
    
    //estado para mostrar los datos en segunda tabla 
    const [rechazadas, setRechazadas] = useState([]);
    const [aprobadas, setAprobadas] = useState([]);

    //estado para el filtro de busqueda
    const [searchTerm, setSearchTerm] = useState({
      nombreUnidad: "",
      date: "",
      nombreAusente: "",
      rutAusente: "",
    });
    
    // useEffect para mantener la persistencia de datos 
    useEffect(() => {
      const storedRechazadas = localStorage.getItem('rechazadas');
      if (storedRechazadas) {
        setRechazadas(JSON.parse(storedRechazadas));
      }
    }, []);

    useEffect(() => {
      localStorage.setItem('rechazadas', JSON.stringify(rechazadas));
    }, [rechazadas]);

    // funcion de filtro de busqueda
    const filteredData = data.filter((item) => {
      const { nombreUnidad, date, nombreAusente, rutAusente } = item;
      const { nombreUnidad: searchProcedencia, date: searchFecha, nombreAusente: searchFuncionario, rutAusente: searchRutAusente } = searchTerm;
      const procedenciaRegex = new RegExp(searchProcedencia, "i");
      const rutAusenteRegex = new RegExp(searchRutAusente, "i");
      const fechaRegex = new RegExp(searchFecha, "i");
      const funcionarioRegex = new RegExp(searchFuncionario, "i");
      return (
        procedenciaRegex.test(nombreUnidad) &&
        fechaRegex.test(date) &&
        funcionarioRegex.test(nombreAusente) &&
        rutAusenteRegex.test(rutAusente)
      );
    });
    
    // funcion para abrir ventana modal de la colunma "Ver detalle"
    const handleShowData = (item) => {
      setSelectedItem(item);
      setShowDetailsModal(true);
    };

    // funcion para cerrar ventana modal de la colunma "Ver detalle"
    const handleCloseModal = () => {

        setSelectedItem(null);
        setShowDetailsModal(false);
    };

    //  funcion para boton de limpear los datos 
    const handleClearData = () => {
        onClearData();
    };


    //  funcion para abrir ventana modal de el boton "Aprobar"
    const handleApprove = (item,index) => {
      setSelectedRow(index);
      setIsModalOpen(true);
    };
    //  funcion para abrir ventana modal de el boton "Rechazar"
    const handleReject = (item) => {
        setSelectedIndex(item);
        setShowRechazarModal(true);
    };

  // funcion para la aprobacion del MEMO-SUPLENCIA y para la aprobación multiple
    const handleSubmitForm = () => {
      const newProgress = [...progress];
      newProgress[selectedRow] += 1;
      setProgress(newProgress);
  
      if (newProgress[selectedRow] === 4) {
        const newData = data.map((item, index) => {
          if (index === selectedRow) {
            return { ...item, estado: "Aprobado" };
          }
          return item;
        });
  
        const approvedItem = newData[selectedRow];
        setAprobadas((aprobadas) => [...aprobadas, approvedItem]);
        const remainingData = newData.filter((item) => item.estado !== "Aprobado");
        setData(remainingData);
      }
    
      setIsModalOpen(false);

    };

// funcion para la justificacion de rechazado
    const handleSubmitRechazo = () => {
      const newData = data.map((item) => {
        if (item.IDcont === selectedIndex.IDcont) {
          return { ...item, estado: "Rechazado" };
        }
        return item;
      });

      setData(newData)
      setShowRechazarModal(false);

      localStorage.setItem('data', JSON.stringify(newData));
    
      const remainingData = newData.filter((item) => item.estado !== "Rechazado");

      setData(remainingData);
  
      setShowRechazarModal(false);
    };
  
  
  
  {/* 

    Aqui se retorna la tabla principal de "Aprobar Solicitudes" y la segunda tabla de documentos ya aprobados 

  */}  
  
  return (
    <div className=" w-full container pb-72 mx-auto ">
      <div className=" my-2 p-5 border-2 border-black  rounded-md">
        <h1 className="text-3xl font-semibold text-center pb-5"> Filtro de busqueda</h1>
        <input
          type="text"
          placeholder="Buscar por procedencia"
          value={searchTerm.nombreUnidad}
          onChange={(e) => setSearchTerm({...searchTerm, nombreUnidad: e.target.value})}
          className="w-full py-2 px-4 border font-semibold border-gray-400 rounded mb-4"
        />
        <input
          type="text"
          placeholder="Buscar por fecha de solicitud"
          value={searchTerm.date}
          onChange={(e) => setSearchTerm({...searchTerm, date: e.target.value})}
          className="w-full py-2 px-4 border font-semibold border-gray-400 rounded mb-4"
        />
        <input
          type="text"
          placeholder="Buscar por funcionario"
          value={searchTerm.nombreAusente}
          onChange={(e) => setSearchTerm({...searchTerm, nombreAusente: e.target.value})}
          className="w-full py-2 px-4 border font-semibold border-gray-400 rounded mb-4"
        />
        <input
          type="text"
          placeholder="Buscar por RUT del funcionario"
          value={searchTerm.rutAusente}
          onChange={(e) => setSearchTerm({...searchTerm, rutAusente: e.target.value})}
          className="w-full py-2 px-4 border font-semibold border-gray-400 rounded mb-4"
        />
      </div>

      <h1 className="text-3xl font-bold my-4 ">Tabla Aprobar Solicitudes</h1>
      <table className="w-full bg-white  rounded">
        <thead >
          <tr className="bg-gray-300">
            <th className="py-2 px-4 border border-1 border-gray-400">N° Solicitud</th>
            <th className="py-2 px-4 border  border-1 border-gray-400">Fecha Solicitud</th>
            <th className="py-2 px-4 border  border-1 border-gray-400">Procedencia</th>
            <th className="py-2 px-4 border  border-1 border-gray-400">Funcionario</th>
            <th className="py-2 px-4 border  border-1 border-gray-400">Reemplazante</th>
            <th className="py-2 px-4 border border-1 border-gray-400">Inicio</th>
            <th className="py-2 px-4 border border-1 border-gray-400">Termino</th>
            <th className="py-2 px-4 border border-1 border-gray-400">Ver Detalle</th>
            <th className="py-2 px-4 border border-1 border-gray-400">Estado</th>
            <th className="py-2 px-4 border border-1 border-gray-400">Acción</th>
            <th className="py-2 px-4 border border-1 border-gray-400">Progreso</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border  border-1 border-gray-400">{item.id}</td>
              <td className="py-2 px-4 border  border-1 border-gray-400">{item.date}</td>
              <td className="py-2 px-4 border  border-1 border-gray-400">{item.nombreUnidad}</td>
              <td className="py-2 px-4 border  border-1 border-gray-400">{item.nombreAusente}</td>
              <td className="py-2 px-4 border  border-1 border-gray-400">{item.nombreReemplazante}</td>
              <td className="py-2 px-4 border  border-1 border-gray-400">{item.fechaSalida}</td>
              <td className="py-2 px-4 border  border-1 border-gray-400">{item.fechaIngreso}</td>
              <td className="py-2 px-4 text-center border  border-1 border-gray-400">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"  onClick={() => handleShowData(item)}> Ver </button>
              </td>
              <td className={`py-2 px-4 border font-semibold text-2xl  border-1 border-gray-400 ${item.estado === 'Aprobado' ? "text-green-600"   : item.estado === 'Rechazado' ? "text-red-600"  : item.estado === 'Pendiente' ? "text-yellow-500" : ''}`}>{item.estado}</td>
              <td className="py-2 px-4 border  border-1 border-gray-400 text-center">
                <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mb-2 mt-1" onClick={() => handleApprove(item,index)}>Aprobar</button>
                <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-3 rounded mb-2" onClick={() => handleReject(item,index)}>Rechazar</button>
              </td>
              <td className="border px-4 py-2  border-1 border-gray-400">
              <div className="flex">
                  {[...Array(4)].map((_, stepIndex) => (
                    <div
                      key={stepIndex}
                      className={`w-6 h-6 mr-2 rounded-full ${
                        stepIndex < progress[index]
                          ? "bg-green-500"
                          : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-3"
        onClick={handleClearData}
      >
        Limpiar Datos
      </button>

      {selectedRow !== null && (
        <div className="modal">
          <AprobarModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmitForm}
            item={selectedRow}
            
          />
        </div>
      )}

      {selectedIndex !== null && (
        <div className="modal">
          <RechazarModal
            isOpen={showRechazarModal}
            onClose={() => setShowRechazarModal(false)}
            onSubmit={handleSubmitRechazo}
            selectedItem={selectedIndex}
            setSelectedItem={setSelectedIndex}
            item={selectedIndex}
          />
        </div>
      )}


      {selectedItem && (
        <div className="modal">
          <DetallesModal isOpen={showDetailsModal} onClose={handleCloseModal} item={selectedItem} />
        </div>
      )}


      <table className="border-collapse w-full  text-center my-10">
        <thead>
          <tr className="border border-1 w-full bg-gray-300  rounded">
            <th className="py-2 px-4 border border-1 border-gray-400">N° Solicitud</th>
            <th className="py-2 px-4 border  border-1 border-gray-400">Fecha Solicitud</th>
            <th className="py-2 px-4 border  border-1 border-gray-400">Procedencia</th>
            <th className="py-2 px-4 border  border-1 border-gray-400">Funcionario</th>
            <th className="py-2 px-4 border  border-1 border-gray-400">Reemplazante</th>
            <th className="py-2 px-4 border border-1 border-gray-400">Inicio</th>
            <th className="py-2 px-4 border border-1 border-gray-400">Termino</th>
            <th className="py-2 px-4 border border-1 border-gray-400">Ver Detalle</th>
            <th className="py-2 px-4 border border-1 border-gray-400">Estado</th>
          </tr>
        </thead>
        <tbody>
          {aprobadas.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border  border-1 border-gray-400">{item.id}</td>
              <td className="py-2 px-4 border  border-1 border-gray-400">{item.date}</td>
              <td className="py-2 px-4 border  border-1 border-gray-400">{item.nombreUnidad}</td>
              <td className="py-2 px-4 border  border-1 border-gray-400">{item.nombreAusente}</td>
              <td className="py-2 px-4 border  border-1 border-gray-400">{item.nombreReemplazante}</td>
              <td className="py-2 px-4 border  border-1 border-gray-400">{item.fechaSalida}</td>
              <td className="py-2 px-4 border  border-1 border-gray-400">{item.fechaIngreso}</td>
              <td className="py-2 px-4 text-center border  border-1 border-gray-400">
                <button className="bg-blue-600 p-3 px-4 rounded-md font-semibold"  onClick={() => handleShowData(item)}> Ver </button>
              </td>
              <td className={`py-2 px-4 border font-semibold text-2xl  border-1 border-gray-400 ${item.estado === 'Aprobado' ? "text-green-600"   : item.estado === 'Rechazado' ? "text-red-600"  : item.estado === 'Pendiente' ? "text-yellow-500" : ''}`}>{item.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};


export default AprobarSolicitud;
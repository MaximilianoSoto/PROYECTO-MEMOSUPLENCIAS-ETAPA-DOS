import Modal from "react-modal"

Modal.setAppElement('#root');

{/*

componente del ventana modal de VER DETALLE

*/}



const DetallesModal = ({ isOpen, onClose, item }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 "
      >
        <div className="bg-white w-1/3 p-4 rounded shadow ">
          <div className=" px-2 py-4 border-2 border-black">
          <div className="flex justify-between mb-5">
          <img src="src/assets/images/logo ministerio.png" className=" w-28 p-2"/>
          <h2 className="text-2xl font-bold mb-4 text-center">HOSPITAL REGIONAL DR ERNESTO TORRES GALDAMEZ </h2> 
          <img src="src/assets/images/logo hospital.png" className="w-28  p-2"/>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">MEMO N° Solicitud {item.id} </h2>
          <p className="mb-2">
            <span className="font-bold">SOLICITO A UD. DISPONER PARA</span> 
          </p>
          <p className="mb-2 ">
            <span className="font-bold">Unidad:</span> {item.areaUnidad}
          </p>
          <p className="mb-2">
            <span className="font-bold">Tipo de contrato:</span> {item.tipoContrato}
          </p>
          <p className="mb-2">
            <span className="font-bold">Politicas reemplazo:</span> {item.ley}
          </p>
          <p className="mb-2">
            <span className="font-bold">Turno:</span> {item.tipoTurno}
          </p>
          <p className="mb-2">
            <span className="font-bold">A favor de don:</span> {item.nombreAusente}
          </p>
          <p className="mb-2">
            <span className="font-bold">Planta :</span> {item.plantaAusente}
          </p>
          <p className="mb-2">
            <span className="font-bold">Cargo:</span> {item.cargoVacante}
          </p>
          <p className="mb-2">
            <span className="font-bold">Grado-Horas:</span> {item.gradoAusente} - {item.horasReemplazante}
          </p>
          <p className="mb-2">
            <span className="font-bold">Desde-Hasta:</span> {item.fechaSalida} - {item.fechaIngreso}
          </p>

          <div className="py-4">
            <p className="mb-2 ">
              <span className="font-bold">PARA CUMPLIR LA AUSENCIA DE</span> 
            </p>
            <p className="mb-2">
              <span className="font-bold">Cargo:</span> {item.cargoReemplazante}
            </p>
            <p className="mb-2">
              <span className="font-bold">Planta:</span> {item.plantaReemplazante}
            </p>
            <p className="mb-2">
              <span className="font-bold">Grado-Horas:</span> {item.gradoReemplazante} - {item.horasReemplazante}
            </p>
            <p className="mb-2">
              <span className="font-bold">Hace uso de:</span> {item.motivoAusente}
            </p>
            <p className="mb-2">
              <span className="font-bold">Ausente desde:</span> {item.fechaSalida}
            </p>
            <p className="mb-2">
              <span className="font-bold">Hasta:</span> {item.fechaIngreso}
            </p>
          </div>

          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
          >
            Cerrar
          </button>
          </div>
        </div>
      </Modal>
      
    );
  };
  
  export default DetallesModal;
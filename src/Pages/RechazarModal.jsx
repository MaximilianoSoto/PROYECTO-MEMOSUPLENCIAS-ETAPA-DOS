import { useState } from "react";
import Modal from "react-modal"


const RechazarModal = ({ isOpen, onClose, onSubmit }) => {
  const [motivo, setMotivo] = useState("");

{/*

componente del ventana modal de RECHAZADO

*/}

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(motivo);
    setMotivo('');
    onClose();
  };

  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
    >
        <div className="bg-white w-1/3 p-4 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Motivo rechazo</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="motivo" className="block text-gray-700 font-semibold mb-1">
                Motivo
                </label>
                <textarea
                    id="motivo"
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
                ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
              Enviar
            </button>
          </form>
        </div>

    </Modal>



  )
    
};

export default RechazarModal;

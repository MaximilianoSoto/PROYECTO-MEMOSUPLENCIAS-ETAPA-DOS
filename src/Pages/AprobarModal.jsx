import { useState} from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');


{/*

componente del ventana modal de APROBACION 

*/}

const AprobarModal = ({ isOpen, onClose, onSubmit }) => {
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(field1, field2);
      setField1('');
      setField2('');
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
          <h2 className="text-3xl font-bold mb-4">Aprobado Por:</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="field1" className="block font-medium mb-1">
                Nombre cargo
              </label>
              <input
                type="text"
                id="field1"
                value={field1}
                onChange={(e) => setField1(e.target.value)}
                className="w-full border border-gray-300 rounded py-2 px-3"
              />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
              Enviar
            </button>
          </form>
        </div>
      </Modal>
    );
  };
  
  export default AprobarModal;
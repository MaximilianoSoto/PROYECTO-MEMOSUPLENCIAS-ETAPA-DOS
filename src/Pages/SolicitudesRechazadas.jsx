
import { useEffect, useState } from 'react';

{/*

PAGINA de HISTORIAL

SE MUESTRA TABLA DE LOS MEMO-SUPLENCIA RECHAZADOS DEL SISTEMA

*/}








const FilasRechazadas = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Obtener los datos del local storage al cargar el componente
    const storedData = localStorage.getItem('data');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const rechazados = data.filter((item) => item.estado === 'Rechazado');

  return (
    <div className='w-full h-screen'>
      <h1 className="text-2xl font-bold mb-4">Filas Rechazadas</h1>
      <table className="border-collapse w-full mx-3 text-center">
        <thead>
          <tr className="border border-1">
            <th className="py-2 px-4 border border-1 border-gray-600">N° Solicitud</th>
            <th className="py-2 px-4 border  border-1 border-gray-600">Fecha Solicitud</th>
            <th className="py-2 px-4 border  border-1 border-gray-600">Procedencia</th>
            <th className="py-2 px-4 border  border-1 border-gray-600">Funcionario</th>
            <th className="py-2 px-4 border  border-1 border-gray-600">Reemplazante</th>
            <th className="py-2 px-4 border border-1 border-gray-600">Inicio</th>
            <th className="py-2 px-4 border border-1 border-gray-600">Termino</th>
            <th className="py-2 px-4 border border-1 border-gray-600">Ver Detalle</th>
          </tr>
        </thead>
        <tbody>
          {rechazados.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border  border-1 border-gray-600">{item.id}</td>
              <td className="py-2 px-4 border  border-1 border-gray-600">{item.date}</td>
              <td className="py-2 px-4 border  border-1 border-gray-600">{item.nombreUnidad}</td>
              <td className="py-2 px-4 border  border-1 border-gray-600">{item.nombreAusente}</td>
              <td className="py-2 px-4 border  border-1 border-gray-600">{item.nombreReemplazante}</td>
              <td className="py-2 px-4 border  border-1 border-gray-600">{item.fechaSalida}</td>
              <td className="py-2 px-4 border  border-1 border-gray-600">{item.fechaIngreso}</td>
              <td className={`py-2 px-4 border font-semibold text-2xl  border-1 border-gray-600 ${item.estado === 'Aprobado' ? "text-green-600"   : item.estado === 'Rechazado' ? "text-red-600"  : item.estado === 'Pendiente' ? "text-yellow-500" : ''}`}>{item.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilasRechazadas;

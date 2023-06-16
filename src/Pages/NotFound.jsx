import { Link } from "react-router-dom";

{/*

PAGINA de ERROR RUTA NO ENCONTRADA (error 404)

*/}




const NoEncontrada = () => {
  return (
    <div>
      <h1 className="text-9xl grid place-content-center p-3 mb-10 ">404</h1>
      <Link
        to="/"
        className="p-3 m-3 text-9xl bg-blue-600 rounded-lg border-5 border-black hover:bg-gray-400 "
      >
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NoEncontrada;
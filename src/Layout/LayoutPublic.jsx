import { Outlet, useLocation } from "react-router-dom";

import SideBar from "../Components/SideBar";

const LayoutPublic = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getTitle = () => {
    switch (currentPath) {
      case "/memosuplencia":
        return "Ingresar Suplencia";
      case "/aprobarsolicitud":
        return "Aprobar Solicitud";
      case "/rechazadas":
        return "Rechazadas";
      default:
        return "Principal";
    }
  };

  const headerTitle = getTitle();

  return (
    <div className="flex  ">
      <SideBar />
      <div className=" w-full flex flex-col">
        <header className="bg-gray-800 py-2 ">
          <div className=" flex">
            <h1 className="text-5xl font-semibold text-center grid place-content-center text-white flex-grow">
              {headerTitle}
            </h1>
            <img
              alt="Logo ministerio"
              src="src/assets/images/logo ministerio.png"
              className=" mr-3 w-36 "
            />
          </div>
        </header>
        <div className="flex flex-grow mx-5 mt-1">
          <Outlet />
        </div>
        <div className="grid grid-cols-3">
          <div className="bg-blue-700">
            <h1 className="scale-0"> A </h1>
          </div>
          <div className="bg-blue-700">
            <h1 className="scale-0"> A </h1>
          </div>
          <div className="bg-red-700">
            <h1 className="scale-0"> A </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutPublic;

const Inicio = () => { 

{/*

PAGINA de INCIO

SE MUESTRA IMAGEN DE DOCUMENTO LEGAL SOBRE MEMO-SUPLENCIA

*/}


return (

<>

 <div className=" w-full  h-screen ">
   <div className="flex ml-72">

    <img  src="src/assets/images/Captura de pantalla 2023-02-02 103022.png" className="border-2 border-black w-auto " /> 
    
    <div className=" grid place-content-center">
      <h1 className="text-6xl font-bold p-5"> Sistema Solicitud y/o Reemplazos (SSR)
      </h1>
      <div className="px-5 text-3xl">
         <p>Etapa II proyecto MEMO-SUPLENCIA </p> 
         <p>Digitalizacion de solicitudes de suplencias </p>
         <p>Hospital Dr Ernesto Torres Galdames </p>
      </div>
    </div>

   </div>

 </div>

</>


)

 }



 export default Inicio;
import {Formik,Field, ErrorMessage,Form} from "formik";
import {useState} from "react";
import Swal from 'sweetalert2'

{/*

PAGINA de INGRESAR SOLICITUD 

PARA LA CONSTRUCCION PRINCIPAL SE OCUPA FORMIK

*/}


const Formulario = ({ onSubmit }) => {
  const [counter, setCounter] = useState(0);
  const [formularioEnviado, cambiarFormularioEnviado]= useState(false);
    
    const getNextId = () => {
      setCounter((prevCounter) => prevCounter + 1);
      return counter + 1;
    };


    const handleForSubmit = (values, {resetForm}) => {
        console.log(values)

        const formData = {
            ...values,
            date: new Date().toLocaleString(),
            estado: "Pendiente",
            IDcont: getNextId()
          };

        onSubmit(formData);
        resetForm();
        cambiarFormularioEnviado(true);

        setTimeout(() => cambiarFormularioEnviado(false), 5000);
        Swal.fire({
          title: 'Esta Seguro?',
          showDenyButton: true,
          confirmButtonText: 'Enviar',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('Enviado!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Los cambios no esta guardados', '', 'info')
          }
        })
				
    };
  
    return (
      <>
      
      
      <div className="flex flex-col w-full ">
        <Formik
        initialValues={{ id: Date.now() , 
        codigoUnidad: '',
        nombreUnidad: '',
        areaUnidad: '',
        tipoContrato: '',
        tipoTurno: '',
        cargoVacante: '',
        politicas: '', 
        rutAusente: '',
        nombreAusente: '', 
        ley: '',
        gradoAusente: '',
        calidadJr: '',
        plantaAusente: '',
        motivoAusente: '',
        fechaSalida: '',
        fechaIngreso: '',
        rutRemplazante: '',
        nombreReemplazante: '',
        plantaReemplazante: '',
        cargoReemplazante: '',
        gradoReemplazante: '',
        horasReemplazante: ''}}

        validate={(valores) => {
          let errores = {};

          // Validacion codigoUnidad
          if(!valores.codigoUnidad){
              errores.codigoUnidad = 'Por favor ingresa un codigo'
          } else if(!/^[0-9]+$/.test(valores.codigoUnidad)){
              errores.codigoUnidad = 'El codigo debe contener solo numeros'
          }

          // Validacion nombreUnidad
          if(!valores.nombreUnidad){
              errores.nombreUnidad = 'Por favor ingresa el nombre de unidad'
          } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombreUnidad)){
              errores.nombreUnidad = 'El nombre de unidad solo puede contener letras y espacios'
          }
          // Validación AreaUnidad
          if(!valores.areaUnidad){
              errores.areaUnidad = 'Por favor ingresa el area de unidad'
          } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.areaUnidad)){
              errores.areaUnidad = 'El area de unidad puede tener conter letras y espacios.'
          }
          //Validación Rut Ausente
          if(!valores.rutAusente){
              errores.rutAusente = 'Por favor ingresa el rut'
          } else if(valores.rutAusente.length !== 10 ){
              errores.rutAusente = 'Rut ingresado debe tener 9 digitos'
          } else if(!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(valores.rutAusente)){
              errores.rutAusente = 'Rut ingresado invalido'
          }
          // Validación Nombre y apellido Ausente
          if(!valores.nombreAusente){
              errores.nombreAusente = 'Por favor ingrese el nombre y apellido'
          } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombreAusente)){
              errores.nombreAusente = 'El nombre del ausente solo puede contener letras y espacios'
          }
          //Calidad Jr
          if(!valores.calidadJr){
              errores.calidadJr = 'Por favor ingrese calidad jr'
          } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.calidadJr)){
              errores.calidadJr = 'Este campo solo puede contener letras y espacios'
          }
          // Validacion plantaAusente 
          if(!valores.plantaAusente){
              errores.plantaAusente = 'Por favor ingrese la planta del ausente'
          } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.plantaAusente)){
              errores.plantaAusente = 'El nombre de la planta solo puede contener letras y espacios'
          }
          // Validación Rut reemplazo
          if(!valores.rutRemplazante){
              errores.rutRemplazante = 'Por favor ingresa el rut'
          } else if(valores.rutRemplazante.length !== 10 ){
              errores.rutRemplazante = 'Rut ingresado debe tener 9 digitos'
          } else if(!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(valores.rutRemplazante)){
              errores.rutRemplazante = 'Rut ingresado invalido'
          }
          // Validación nombre y apellido del reemplazante
          if(!valores.nombreReemplazante){
              errores.nombreReemplazante = 'Por favor ingrese el nombre y apellido'
          } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombreReemplazante)){
              errores.nombreReemplazante = 'Este campo solo puede contener letras y espacios'
          }
          //Validación cargo reemplazante
          if(!valores.cargoReemplazante){
              errores.cargoReemplazante = 'Por favor ingrese el campo'
          } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.cargoReemplazante)){
              errores.cargoReemplazante = 'Este solo puede contener letras y espacios'
          }
          
          return errores;
          }}


        onSubmit={handleForSubmit}
        >
        {({errors}) => (
          <Form className="formulario">
          <div>
            <div className="p-5 rounded-2xl  border-4  border-gray-400">
              <div>
              <h3 className="text-center font-semibold text-3xl"> Unidad Solicitante</h3>
                <br />
                <label htmlFor="codigoUnidad"> Codigo Unidad</label>
                <Field
                type="number"
                id="codigoUnidad"
                name="codigoUnidad"
                placeholder="Ingresar Codigo"
                />
              </div>
              <ErrorMessage name="codigoUnidad" component={() => (<div className="error">{errors.codigoUnidad}</div>)} />
              <div>
                <label htmlFor="nombreUnidad">Nombre Unidad</label>
                <Field
                type="text"
                id="nombreUnidad"
                name="nombreUnidad"
                placeholder="Ingresar Nombre Unidad"
                />
              </div>
              <ErrorMessage name="nombreUnidad" component={() => (<div className="error">{errors.nombreUnidad}</div>)} />
              <div>
                <label htmlFor="areaUnidad">Area</label>
                <Field
                type="text"
                id="areaUnidad"
                name="areaUnidad"
                placeholder="Ingresar Área"
                />
              </div>
              <ErrorMessage name="areaUnidad" component={() => (<div className="error">{errors.areaUnidad}</div>)} />
              <div className="flex justify-between my-5">
                <div className="">
                  <label htmlFor='tipoContrato'>Tipo de contrato</label>
                  <Field name="tipoContrato" as="select" className="rounded-sm border p-2 lg:pr-28 pr-2 border-gray-400">
                  <option value="">Elegir </option>
                  <option value="tipo 1">Tipo 1</option>
                  <option value="tipo 2">Tipo 2</option>
                  <option value="tipo 3">Tipo 3</option>
                  </Field>
                  
                </div>
                <div>
                  <label htmlFor='tipoTurno'>Tipo de turno</label>
                  <Field name="tipoTurno" as="select" className="rounded-sm border p-2 lg:pr-28 pr-2 border-gray-400" >
                    <option value="">Elegir </option>
                    <option value="tipo 1">Tipo 1</option>
                    <option value="tipo 2">Tipo 2</option>
                    <option value="tipo 3">Tipo 3</option>
                  </Field>
                </div>
                <div>
                  <label htmlFor='cargoVacante'>Cargo vacante</label>
                  <Field name="cargoVacante" as="select" className="rounded-sm border p-2 lg:pr-28 pr-2 border-gray-400">Cargo vacante
                    <option value="">Elegir </option>
                    <option value="tipo 1">Tipo 1</option>
                    <option value="tipo 2">Tipo 2</option>
                    <option value="tipo 3">Tipo 3</option>
                  </Field>
                </div>
              
                <div>
                <label htmlFor="politicas">Politicas</label>
                <Field name="politicas" as="select" className="rounded-sm border p-2 lg:pr-28 pr-2 border-gray-400">Cargo vacante
                    <option value="">Elegir </option>
                    <option value="tipo 1">Tipo 1</option>
                    <option value="tipo 2">Tipo 2</option>
                    <option value="tipo 3">Tipo 3</option>
                </Field>
                </div>
              </div>
            </div>
             
            <div className="p-5 rounded-2xl  border-4 mt-10 border-gray-400"> 
              <div>
                <h3 className="text-center font-semibold text-3xl py-5"> Personal Ausente </h3>
                <label htmlFor="rutAusente"> Rut (sin puntos y con guion) </label>
                <Field
                type="text"
                id="rutAu"
                name="rutAusente"
                placeholder="Porfavor ingrese su rut"
                />
                <ErrorMessage name="rutAusente" component={() => (<div className="error">{errors.rutAusente}</div>)} />
              </div>
              <div>
                <label htmlFor="nombreAusente"> Nombre y apellido </label>
                <Field
                type="text"
                id="nombreAu"
                name="nombreAusente"
                placeholder="Ingrese nombre y apellido"
                />
                <ErrorMessage name="nombreAusente" component={() => (<div className="error">{errors.nombreAusente}</div>)} />
              </div>
              <div>
                <label htmlFor="ley">Ley</label>
                <Field 
                type="number" 
                id="ley" 
                name="ley" 
                placeholder="ingresa ley" />
                <ErrorMessage name="ley" component={() => (<div className="error">{errors.ley}</div>)} />
              </div>
              
              <div>
                <label htmlFor="gradoAusente">Gr</label>
                <Field
                type="number"
                id="gradoAU"
                name="gradoAusente"
                placeholder="Ingreso grado"
                />
              </div>
              <div>
                <label htmlFor="calidadJr">Calidad J.</label>
                <Field
                type="text"
                id="calidadJr"
                name="calidadJr"
                placeholder="Ingreso calidad"
                />
                <ErrorMessage name="calidadJr" component={() => (<div className="error">{errors.calidadJr}</div>)} />
              </div>
              <div>
                <label htmlFor="plantaAusente"> Planta </label>
                <Field
                type="text"
                id="plantaAu"
                name="plantaAusente"
                placeholder="Indique planta"
                />
                <ErrorMessage name="plantaAusente" component={() => (<div className="error">{errors.plantaAusente}</div>)} />
              </div>
              <div>
                <label htmlFor="motivoAusente">Motivo Ausencia</label>
                <Field name="motivoAusente"  type="textarea" placeholder="Ingrese el motivo"/>  
              </div>
              <div>
                <label htmlFor="fechaSalida"> Ausencia desde: </label>
                <Field 
                type="datetime-local" 
                id="fechaSalida" 
                name="fechaSalida" />
              </div>
              <div>
                <label htmlFor="fechaIngreso"> Ausencia Hasta: </label>
                <Field
                type="datetime-local" 
                id="fechaIngreso" 
                name="fechaIngreso" />
              </div>
            </div>
      
             
            <div className="p-5 rounded-2xl  border-4 mt-10 border-gray-400">
              <div>
                <br />
                <h3 className="text-center font-semibold text-3xl "> Personal Reemplazo </h3>
                <label htmlFor="rutRemplazante"> Rut (sin puntos y con guion)</label>
                <Field
                type="text"
                id="rutRe"
                name="rutRemplazante"
                placeholder="Porfavor ingrese su rut"
                />
                <ErrorMessage name="rutRemplazante" component={() => (<div className="error">{errors.rutRemplazante}</div>)} />
              </div>
              <div>
                <label htmlFor="nombreReemplazante"> Nombre y apellido </label>
                <Field
                type="text"
                id="nombreRe"
                name="nombreReemplazante"
                placeholder="Ingrese nombre y apellido"
                />
                <ErrorMessage name="nombreReemplazante" component={() => (<div className="error">{errors.nombreReemplazante}</div>)} />
              </div>
              <div>
                <label htmlFor="cargoReemplazante">Cargo del reemplazante</label>
                <Field
                type="text"
                id="cargoRe"
                name="cargoReemplazante"
                placeholder="ingresa cargo"
                />
                <ErrorMessage name="cargoReemplazante" component={() => (<div className="error">{errors.cargoReemplazante}</div>)} />
              <div>
                <label htmlFor="plantaReemplazante"> Planta Reemplazante </label>
                <Field
                type="text"
                id="plantaReemplazante"
                name="plantaReemplazante"
                placeholder="Indique planta"
                />
                <ErrorMessage name="plantaAusente" component={() => (<div className="error">{errors.plantaAusente}</div>)} />
              </div>
              </div>
              <div>
                <label htmlFor="gradoReemplazante"> Grado</label>
                <Field
                type="number"
                id="gradoRe"
                name="gradoReemplazante"
                placeholder="Ingreso el grado"
                />
              </div>
              <div>
                <label htmlFor="horasReemplazante"> Horas </label>
                <Field
                type="number"
                id="Horas"
                name="horasReemplazante"
                placeholder="Indique el numero de horas"
                />
              </div> 
            </div>  
      
          </div>
          
        <button type="submit" className="my-5">Enviar</button>
          {formularioEnviado}
          
        </Form>
        )}
      </Formik>
      </div>
      </>
    );
  };
  
  export default Formulario;
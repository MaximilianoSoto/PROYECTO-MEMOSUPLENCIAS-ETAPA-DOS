import ReactDOM from 'react-dom/client'
import './index.css'
import App from './Router'
import { BrowserRouter } from 'react-router-dom'


{/*

aqui se configura con BrowserRouter para el envolver a la aplicaion (</App>)

*/}





ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <BrowserRouter>
  
    <App/>
  
  </BrowserRouter>  



  //</React.StrictMode>,
)

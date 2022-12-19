import express  from "express";
import cors from 'cors' 
import Programa from './src/routes/programa.routes.js'
import Tener_Arancel from './src/routes/tener_arancel.routes.js'
import Becas from './src/routes/becas.routes.js'
import Comprobante from './src/routes/comprobante.routes.js'
import Estudiante from './src/routes/estudiante.routes.js'
import Cuenta from "./src/routes/cuenta.routes.js";

//Crear aplicación express
const App = express();

//Permite la analización de entrada en formato json
App.use(express.json())

//Habilitación de cors 
App.use(cors())

//Trar end-points que esten disponible en la ruta localhost:3000/api/

App.use("/api",Programa);

App.use("/api",Tener_Arancel);

App.use("/api",Becas);

App.use("/api",Comprobante);

App.use("/api",Estudiante);

App.use("/api",Cuenta);


App.listen(3000);
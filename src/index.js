
// iMPORTAMOS CARPETAS O LIBRERIAS DE OTROS LUGARES

import express from 'express';
import cors from 'cors';
import {validateToken }from './Middleware/autheticationMiddleware.js';


import{ router as  inventoryRouter } from './routes/inventoryRouter.js';
import { router as authenticationRouter } from './routes/authenticationRouter.js';
import { router as salesRouter } from './routes/salesRouter.js';
import {router as dashRouter} from './routes/dashRoute.js'

// Configuracion del servidor
const server = express();

server.use(express.json());
server.use(cors());

// Enpoint de la app o la api
server.use("/",authenticationRouter);

server.use("/inventory",validateToken,inventoryRouter);

server.use("/sales",validateToken,salesRouter);

server.use("/dash",validateToken, dashRouter )

// puerto de ntrada principal para la app
server.listen(3000,() => {
    console.log("Server is running on port 3000");
})

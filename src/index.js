import express from 'express';
import cors from 'cors';
import {validateToken }from './Middleware/autheticationMiddleware.js';

import{ router as  inventoryRouter } from './routes/inventoryRouter.js';
import { router as authenticationRouter } from './routes/authenticationRouter.js';
import { router as salesRouter } from './routes/salesRouter.js';
const server = express();

server.use(express.json());
server.use(cors());


server.use("/",authenticationRouter);

server.use("/inventory",validateToken,inventoryRouter);

server.use("/sales",validateToken,salesRouter);

// server.use("/sales",validateToken,inventoryRouter);

server.listen(3000,() => {
    console.log("Server is running on port 3000");
})
import express from 'express';
import cors from 'cors';

import{ router as  inventoryRouter } from './routes/inventoryRouter.js';
 import { router as authenticationRouter } from './routes/authenticationRouter.js';

const server = express();

server.use(express.json());
server.use(cors());


server.use("/",authenticationRouter);

server.use("/inventory",inventoryRouter);

server.listen(3000,() => {
    console.log("Server is running on port 3000");
})
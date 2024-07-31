import express from 'express';

import{ router as  inventoryRouter } from './routes/inventoryRouter.js';


const server = express();



server.use("/inventory",inventoryRouter);

server.listen(3000,() => {
    console.log("Server is running on port 3000");
})
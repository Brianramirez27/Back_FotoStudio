import express from 'express';
import cors from 'cors';

import{ router as  inventoryRouter } from './routes/inventoryRouter.js';
 import { router as userRouter } from './routes/userRouter.js';

const server = express();

server.use(cors());


server.use("/user",userRouter);

server.use("/inventory",inventoryRouter);

server.listen(3000,() => {
    console.log("Server is running on port 3000");
})
import { Router } from "express";
import * as userController  from "../controller/userController.js";



const router = Router();


router.get("/",userController.getUser,);

// futuras inplementaciones

// router.put("/:userId",(req,res) => {});


// router.delete("/userId",(req,res) => {});

export { router };
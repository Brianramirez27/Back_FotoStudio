import { Router } from "express";
import * as authenticationController  from "../controller/authenticationController.js";


const router = Router();


router.post("/authentication",authenticationController.authenticateUser,);

router.post("/register",authenticationController.registerUser);


export { router };
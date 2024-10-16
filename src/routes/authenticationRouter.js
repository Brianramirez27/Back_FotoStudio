import { Router } from "express";
import * as authenticationController  from "../controller/authenticationController.js";


const router = Router();

router.get("/user",authenticationController.getUsers);

router.post("/authentication",authenticationController.authenticateUser,);

router.post("/register",authenticationController.registerUser);


export { router };
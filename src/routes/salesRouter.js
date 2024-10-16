import { Router } from "express";
import * as salesController from "../controller/salesController.js";

const router = Router();

router.get("/", salesController.getSales);
router.post("/", salesController.createSale);
router.put("/:id", salesController.updateSale);
router.delete("/:id", salesController.deleteSale);
router.get("/products", salesController.getProductsListforSale);

export {router}
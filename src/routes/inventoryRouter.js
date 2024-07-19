import express from 'express';
import  * as invetoryController  from '../controller/inventoryController.js';

const router = express.Router();

router.get("/",invetoryController.getAllItemsInventory);
router.post("/",invetoryController.addItemInventory);
router.put("/:id", invetoryController.updateItemInventory);
router.delete("/:id", invetoryController.deleteItemInventory);


export  {router};
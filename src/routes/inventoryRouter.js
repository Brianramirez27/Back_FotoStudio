import express from 'express';

import  * as invetoryController  from '../controller/inventoryController.js';

const router = express.Router();

router.get("/",(req,res)=>{
    res.send(" ");
})


router.post("/",invetoryController.addItemInventory);
// router.put("/:id", invetoryController.updateItemInventory);
router.delete("/:id", invetoryController.deleteItemInventoryController);




// despues se saca a un propio archivo de rutas que manaje als categorias 
router.post("/category",invetoryController.createCategoryInventoryController);
// router.get("/",invetoryController.getAllItemsInventory);





export  {router};
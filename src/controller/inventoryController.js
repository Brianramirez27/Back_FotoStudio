
import * as inventoryService from '../services/inventoryService.js';



 
const addItemInventory = async (req, res) => {
    try {
        // despues verificar data para que no pasen datos vacios o incorrectos
        const productData = req.body;
        const addedItem = await inventoryService.addItemInventory({ productData });
        return res.status(201).json(addedItem);
    } catch(error) {
        return res.status(500).json({ error: error.message });
    }

};


const updateItemInventoryController = async (req, res) => {

    try{
        const productId = req.params.id;
        const data = req.body;
        const updatedItem = await inventoryService.updateItemInventoryService({productId, data});
        return res.status(200).json(updatedItem);
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
   
}

const getAllItemsInventoryController =async (req, res) => {
    try{
      
        const items = await inventoryService.getAllItemsInventoryService();
        return res.status(200).json(items);
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
    
}

const deleteItemInventoryController =async (req, res) => {
    try{
        const productId = req.params.id;
    
        const deletedItem = await inventoryService.deleteItemInventoryService({productId});
        return res.status(200).json(deletedItem);

    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

// esto pasar a otro archivo de servicios que maneje las categorias, re factorizar
const createCategoryInventoryController = async (req, res) => {

    try{
        const categoryData = req.body;
        const addedCategory = await inventoryService.createCategoryInventoryService({ categoryData });
        return res.status(201).json(addedCategory);
    }catch(error){
        return res.status(500).json({ error: error.message });
    }

}

const getAllCategorysInventoryController = async (req, res) => {
    try{
        const categorys = await inventoryService.getAllCategorysInventoryService();
        return res.status(200).json(categorys);
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
} 


export {
    addItemInventory,
    getAllItemsInventoryController,
    deleteItemInventoryController,
    updateItemInventoryController,
    // -----------------------------
    getAllCategorysInventoryController,
    createCategoryInventoryController
   
   
};

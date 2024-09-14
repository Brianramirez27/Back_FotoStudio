
import * as inventoryService from '../services/inventoryService.js';



 
const addItemInventory = async (req, res) => {
    try {
        // despues verificar data para que no pasen datos vacios o incorrectos
        const productData = req.body;
        const addedItem = await inventoryService.addItemInventory({ productData });
        return res.status(201).json(addedItem);
    } catch {
        return res.status(500).json({ error: error.message });
    }

};


// const updateItemInventory = (req, res) => {
//     const updatedItem = inventoryService.updateItemInventory();
//     res.send(updateItemInventory);
// }

// const getAllItemsInventory = (req, res) => {
//     const items = inventoryService.getAllItemsInventory();
//     res.send(items);
// }

const deleteItemInventoryController =async (req, res) => {
    try{
        const productId = req.params.id;
    
        const deletedItem = await inventoryService.deleteItemInventoryService({productId});
        return res.status(200).json(deletedItem);

    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

// esto apsar a otro archivo de servicios
const createCategoryInventoryController = async (req, res) => {

    try{
        const categoryData = req.body;
        const addedCategory = await inventoryService.createCategoryInventoryService({ categoryData });
        return res.status(201).json(addedCategory);
    }catch(error){
        return res.status(500).json({ error: error.message });
    }

}


export {
    addItemInventory,
    createCategoryInventoryController,
    // updateItemInventory,
    // getAllItemsInventory,
    deleteItemInventoryController
};

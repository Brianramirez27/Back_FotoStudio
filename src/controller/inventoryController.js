
import * as inventoryService from '../services/inventoryService.js';

// const addItemInventory = (req, res) => {
//     const addedItem = inventoryService.addItemInventory();
//     res.send(addedItem);
// };

// const updateItemInventory = (req, res) => {
//     const updatedItem = inventoryService.updateItemInventory();
//     res.send(updateItemInventory);
// }

const getAllItemsInventory = (req, res) => {
    const items = inventoryService.getAllItemsInventory();
    res.send(items);
}

const deleteItemInventory = (req, res) => {
    const deletedItem = inventoryService.deleteItemInventory();
    res.send("delete item inventory");
}

export {
    // addItemInventory,
    // updateItemInventory,
    getAllItemsInventory,
    deleteItemInventory
}

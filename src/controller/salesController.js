import * as salesService from '../services/salesService.js';


const getSales = async (req, res) => {
    try{
        const sale = await salesService.getSales();
        return res.status(200).json(sale);
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

const createSale = async (req, res) => {
    try{
        const saleData = req.body;
        const addSale = await salesService.createSale({saleData}); 
        return res.status(201).json(addSale);
    }catch(error)
    {
        return res.status(500).json({ error: error.message });
    }
}

const deleteSale = async (req, res) => {
    try {
        const saleId = req.params.id;
        const deleteSale = await salesService.deleteSale({saleId});
        return res.status(200).json(deleteSale);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getProductsListforSale = async (req, res) => {
    try {
        const products = await salesService.getProductsListforSale();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateSale = async (req, res) => {
    try {
        const saleId = req.params.id;
        const saleData = req.body;
        const updateSale = await salesService.updateSale({saleId, saleData});
        return res.status(200).json(updateSale);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export {
    createSale,
    getSales,
    getProductsListforSale,
    deleteSale,
    updateSale
}


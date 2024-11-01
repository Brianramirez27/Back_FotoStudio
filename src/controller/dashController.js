import * as dashService from "../services/dashService.js"

const getSalesForYear = async (req, res) => {
    try {
        const sales = await dashService.getSalesForYear()
        return res.status(200).json(sales)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

const getSalesForMonth = async (req, res) => {
    try {
        const sales = await dashService.getSalesForMonth()
        return res.status(200).json(sales)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

const getSalesForDay = async (req, res) => {
    try {
        const sales = await dashService.getSalesForDay()
        return res.status(200).json(sales)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

const getItemBestSeller = async (req, res) => {
    try {
        const params = req.params
        const item = await dashService.getItemBestSeller({ params })
        return res.status(200).json(item)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getEarningsByYear = async (req, res) => {
    try {
        const earnins = await dashService.getEarningsByYear()
        return res.status(200).json(earnins)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getEarningsByDay = async (req, res) => {
    const day = req.params.id
    try {
        const earnins = await dashService.getEarningsByDay({day})
        return res.status(200).json(earnins)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getEarningsByMonth = async (req, res) =>{
    const month = req.params.id

    try{
        const earnins = await dashService.getEarningsByMonth({month})
        return res.status(200).json(earnins)
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

export {
    getSalesForYear,
    getSalesForMonth,
    getSalesForDay,
    getItemBestSeller,
    getEarningsByDay,
    getEarningsByMonth,
    getEarningsByYear
}
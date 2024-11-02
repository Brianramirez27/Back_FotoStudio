import pool from "../config/conection_db.js"
const getSalesForYear = async () => {
    try {
        const res = await pool.query('SELECT EXTRACT(YEAR FROM created_at) as time, COUNT(*) as value FROM sale GROUP BY time')
        if (res.rowCount > 0) {
            const sales = res.rows;
            return { success: true, sales }
        } else {
            return { sucees: false, message: "No sales found" }
        }
    } catch (error) {
        throw new Error(error.message);
    }

}

const getSalesForMonth = async () => {
    try {

        const res = await pool.query('SELECT EXTRACT(YEAR FROM created_at) as year, EXTRACT(MONTH FROM created_at) as month, COUNT(*) as value FROM sale GROUP BY year, month ORDER BY year DESC, month DESC')
        if (res.rowCount > 0) {
            const sales = res.rows;
            return { success: true, sales }
        } else {
            return { sucees: false, message: "No sales found" }
        }
    } catch (error) {
        throw new Error(error.message);
    }

}

const getSalesForDay = async () => {
    try {
        const res = await pool.query(`
            SELECT 
            EXTRACT(YEAR FROM created_at) as year, 
            EXTRACT(MONTH FROM created_at) as month, 
            EXTRACT(DAY FROM created_at) as day, 
            COUNT(*) as value 
            FROM sale 
            WHERE created_at >= date_trunc('month', current_date) - interval '3  month'
            GROUP BY year, month, day 
            ORDER BY year DESC, month DESC, day DESC
        `);
        if (res.rowCount > 0) {
            const sales = res.rows;
            return { success: true, sales }
        } else {
            return { sucees: false, message: "No sales found" }
        }
    } catch (error) {
        throw new Error(error.message);
    }

}

const getItemBestSeller = async ({ params }) => {
    try {
        const { startDate, endDate } = params;
        const res = await pool.query(`
SELECT 
    p.product_id, 
    cp.category_product_id,
    cp.category_product_name,	
    cp."category_produc_Url_Img",
    SUM(sd.sales_details_amount) AS total_units_sold
FROM 
    category_product cp 
JOIN 
    product p ON p."fk_product_categoryProduct" = cp.category_product_id
JOIN 
    sales_details sd ON sd.sales_details_product_id = p.product_id
JOIN 
    sale s ON s.sale_id = sd.sales_details_sale_id
WHERE 
    s.created_at::date BETWEEN $1 AND $2
GROUP BY 
    p.product_id, cp.category_product_id
ORDER BY 
    total_units_sold DESC
LIMIT 1;


        `, [startDate, endDate]);

        if (res.rowCount > 0) {
            const bestSeller = res.rows[0];
            return { success: true, bestSeller }
        } else {
            return { success: false, message: "No sales found in the given period" }
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const getEarningsByYear = async () => {
    try {
        const res = await pool.query(`
            SELECT 
            EXTRACT(YEAR FROM s.created_at) as year, 
            SUM(sd.sales_details_amount * p.pructo_price) as total_earnings
            FROM sale s
            JOIN sales_details sd ON s.sale_id = sd.sales_details_sale_id
            JOIN product p ON sd.sales_details_product_id = p.product_id
            GROUP BY year
            ORDER BY year DESC
        `);

        if (res.rowCount > 0) {
            const earnings = res.rows;

            let total_earnings_by_year = earnings.map(row => ({
                year: row.year,
                total_earnings: Number(row.total_earnings)
            }));

            return { success: true, total_earnings_by_year }
            return { success: true, }
        } else {
            return { success: false, message: "No earnings found" }
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const getEarningsByDay = async ({ day }) => {
    try {
        const res = await pool.query(`
            SELECT 
            EXTRACT(YEAR FROM s.created_at) as year,
            EXTRACT(MONTH FROM s.created_at) as month,
            EXTRACT(DAY FROM s.created_at) as day,
            SUM(sd.sales_details_amount * p.pructo_price) as total_earnings
            FROM sale s
            JOIN sales_details sd ON s.sale_id = sd.sales_details_sale_id
            JOIN product p ON sd.sales_details_product_id = p.product_id
            WHERE TO_CHAR(s.created_at, 'YYYY-MM-DD') = $1
            GROUP BY year, month, day
        `, [day]);

        if (res.rowCount > 0) {
            const earnings = res.rows.reduce((acc, row) => acc + Number(row.total_earnings), 0);
            const result = {
                time: day,
                total_earnings: earnings
            };
            return { success: true, result }
        } else {
            return { success: false, message: "No earnings found for today" }
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getEarningsByMonth = async ({ month }) => {
    try {
        const res = await pool.query(`
            SELECT 
            EXTRACT(YEAR FROM s.created_at) as year,
            EXTRACT(MONTH FROM s.created_at) as month,
            SUM(sd.sales_details_amount * p.pructo_price) as total_earnings
            FROM sale s
            JOIN sales_details sd ON s.sale_id = sd.sales_details_sale_id
            JOIN product p ON sd.sales_details_product_id = p.product_id
            WHERE TO_CHAR(s.created_at, 'YYYY-MM') = $1
            GROUP BY year, month
        `, [month]);

        if (res.rowCount > 0) {
            const earnings = res.rows.reduce((acc, row) => acc + Number(row.total_earnings), 0);
            const result = {
                time: month,
                total_earnings: earnings
            };
            return { success: true, result }
        } else {
            return { success: false, message: "No earnings found for the specified month" }
        }
    } catch (error) {
        throw new Error(error.message);
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
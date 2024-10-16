import pool from "../config/conection_db.js";
import crypto from 'node:crypto';


const getSales = async () => {

    try {
        const res = await pool.query('SELECT  * FROM sale');
        const salesWithDetails = await Promise.all(res.rows.map(async (sale) => {
            const detailsQuery = await pool.query(
                `SELECT  p.product_id, p.pructo_price,sd.sales_details_amount, p.product_amount, p.product_cost, p.created_at, cp.category_product_name, cp."category_produc_Url_Img" FROM sale	s  
				JOIN sales_details sd ON s.sale_id =  sd.sales_details_sale_id
				JOIN product p ON  sd.sales_details_product_id = p.product_id
				JOIN category_product  cp ON p."fk_product_categoryProduct" = cp.category_product_id 
				WHERE s.sale_id =  $1`,
                [sale.sale_id]
            );
            sale.details = detailsQuery.rows;
            return sale;
        }));
        return { success: true, sales: salesWithDetails };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error retrieving sales' };
    }

}



const createSale = async ({ saleData }) => {
    try {
        const { sale_user_id, sale_total_price, sales_name_seller, details } = saleData;

        console.log(details);

        const sale_id = crypto.randomUUID();

        const query = await pool.query('INSERT INTO public.sale (sale_id, sale_user_id, sale_total_price, sales_name_seller, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *', [sale_id, sale_user_id, sale_total_price, sales_name_seller, new Date()]);

        const saleDetails_id = crypto.randomUUID();


        const salesDetailsQueries = details.map(detail => {
            const saleDetails_id = crypto.randomUUID();
            return pool.query('INSERT INTO public.sales_details (sales_details_id,sales_details_sale_id, sales_details_product_id, sales_details_amount) VALUES ($1, $2, $3, $4)', [saleDetails_id, sale_id, detail.idProduct, detail.amount]);
        });

        await Promise.all(salesDetailsQueries);

        const updateProductQueries = details.map(detail => {
            return pool.query('UPDATE public.product SET product_amount = product_amount - $1 WHERE product_id = $2', [detail.amount, detail.idProduct]);
        })

        await Promise.all(updateProductQueries);


        if (query.rowCount === 1) {
            const saleInsert = query.rows[0];
            return { success: true, saleInsert };
        }

    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);

    }
}

const updateSale = async ({ saleId, saleData }) => {

    try {
        const { details, deleted } = saleData




        let total = details?.reduce((acc, product) => {
            const salesDetailsAmount = Number(product.sales_details_amount) || 0;
            const productPrice = Number(product.pructo_price) || 0;
            return acc + (salesDetailsAmount * productPrice);
        }, 0)

        const sale = await pool.query('UPDATE public.sale SET sale_total_price = $1 WHERE sale_id = $2 RETURNING *',
            [total, saleId]);

        if (deleted) {
            const deleteDetails = deleted.map(detail => {
                console.log(detail.product_id, detail)

                return pool.query('DELETE FROM public.sales_details WHERE sales_details_sale_id = $1 AND sales_details_product_id = $2', [saleId, detail.product_id]);

            });

            Promise.all(deleteDetails)
                .catch((e) => {
                    throw new Error(e.message)
                })
        }

        if (sale.rowCount === 1) {
            return { success: true, sale: sale.rows[0] };
        } else {
            throw new Error('Sale not found')
        }
    } catch (error) {
        throw new Error(error.message);
    }

    try {




    } catch (error) {

    }


}

const deleteSale = async ({ saleId }) => {
    const sale_id = saleId;


    try {

        const productDetails = await pool.query('SELECT * FROM public.sales_details WHERE sales_details_sale_id = $1', [sale_id])


        const products = productDetails.rows

        console.log(products)

        const restoreProducts = products.map(async (detail) => {
            console.log(detail)
            return pool.query('UPDATE public.product SET product_amount = product_amount + $1 WHERE product_id = $2', [detail.sales_details_amount, detail.sales_details_product_id]);
        })

        Promise.all(restoreProducts)



        const queryDetails = await pool.query(
            'DELETE FROM public.sales_details WHERE sales_details_sale_id = $1',
            [sale_id]
        ).catch((e) => {
            console.log(e)
        })


        const query = await pool.query(
            'DELETE FROM public.sale WHERE sale_id = $1  RETURNING *',
            [sale_id]
        );


        if (query.rowCount === 1) {
            const saleDelete = query.rows[0];
            return { success: true, saleDelete };
        }


    } catch (error) {
        throw new Error(error.message);
    }
}


const getProductsListforSale = async () => {
    try {
        const res = await pool.query('select * from product JOIN category_product  ON category_product.category_product_id = product."fk_product_categoryProduct"')

        if (res.rowCount > 0) {
            const products = res.rows;
            return { success: true, products };
        } else {
            return { success: false, message: "No products found" };
        }
    } catch (error) {
        return { success: false, message: "No products found" };
    }
}

export {
    getSales,
    createSale,
    updateSale,
    deleteSale,
    getProductsListforSale
}
import pool from '../config/conection_db.js';
import crypto from 'node:crypto';


// a este le falta pasar la categoria apra modificarla y terminarla
const addItemInventory = async ({ productData }) => {
    try {
        const { product_amount, product_cost, product_price, category_product_id } = productData;
        const product_id = crypto.randomUUID();
        // // Convertir el ID de categoría a string
        // const categoryProductIdString = String(category_product_id);

        // Ejecutar la consulta
        const query = await pool.query(
            'INSERT INTO public.product (product_id,fk_product_category_product, product_amount, product_cost,product_price, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [product_id, category_product_id, product_amount, product_cost, product_price, new Date()]
        );

        // Comprobar si se insertó correctamente
        if (query.rowCount === 1) {
            const productInsert = query.rows[0];
            return { success: true, productInsert };
        }
    } catch (error) {
        // retornar un objecto tambien con el error es mejor
        throw new Error(error.message);
    }
};

const deleteItemInventoryService = async ({ productId }) => {

    const product_id = productId;
    try {
        const query = await pool.query(
            'DELETE FROM public.product WHERE product_id = $1  RETURNING *',
            [product_id]
        );

        if (query.rowCount === 1) {
            const productDelete = query.rows[0];
            return { success: true, productDelete };
        }

    } catch (error) {
        // retornar un objecto tambien con el error es mejor
        throw new Error(error.message);
    }
};

const getAllItemsInventoryService = async () => {
   
    try {
        const query = await pool.query(`
        SELECT 
          product.product_id, 
          product.product_price, 
          product.product_cost,
          product.product_amount,
          category_product.category_product_name,
          category_product.category_product_url_img
        FROM 
          public.product 
        INNER JOIN 
          public.category_product 
        ON 
          product.fk_product_category_product = category_product.category_product_id
      `);
       
        if (query.rowCount > 0) {
    
            const products = query.rows; // Esto contiene todas las filas con la información de producto y categoría
            return { success: true, products }; // Retornar todas las filas
        } else {
            return { success: false, message: "No products found" };
        }
    } catch (error) {
        throw new Error(error.message);
    }
}



// const updateItemInventory = () => {
//     return "update item inventory database";
// };

// 



//esto pasar a otro archivo de servicios 
const createCategoryInventoryService = async ({ categoryData }) => {

    // no retorna el objecto si gaurda per no retorna el objecto

    try {
        // Ejecutar la consulta
        const { category_product_name, category_product_url_img } = categoryData;
        const category_product_id = crypto.randomUUID();
        const query = await pool.query(
            'INSERT INTO public.category_product (category_product_id,category_product_name,category_product_url_img) VALUES ($1, $2, $3) RETURNING *',
            [category_product_id, category_product_name, category_product_url_img]
        );

        if (query.rowCount === 1) {
            console.log("desde el servicio de categoria");
            const categoryInsert = query.rows[0];
            console.log(categoryInsert);
            return { success: true, categoryInsert };;
        }

    } catch (error) {
        // retornar un objecto tambien con el error es mejor
        throw new Error(error.message);
    }
}

const getAllCategorysInventoryService = async () => {
    try {
        const query = await pool.query('SELECT * FROM public.category_product');

        if (query.rowCount > 0) {
            const categories = query.rows; // Esto contiene todas las filas
            return { success: true, categories }; // Retornar todas las filas
        }
    }
    catch (error) {
        throw new Error(error.message);
    }

};

export {
    addItemInventory,
    getAllItemsInventoryService,
    deleteItemInventoryService,
    // ---------------------------
    createCategoryInventoryService,
    getAllCategorysInventoryService,
    //     updateItemInventory,
   
}
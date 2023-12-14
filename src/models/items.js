const { conn } = require('../config/conn');

const getAll = async ()=> {
    try {
        const [rows] = await conn.query('SELECT * FROM product;'); // no me manda limpio el json me trae row y fields
        return rows;
    } catch(e) {
        const error = {
            isError:true,
            message: `No pudimos cargar los datos por ${e}`
        }
        return error;
    }
 
}

const getById = async (params)=> {
    try {
        const [rows] = await conn.query('SELECT * FROM product WHERE ?;', params); // no me manda limpio el json me trae row y fields

        return rows[0];
    } catch(e) {
        console.log( e);
        const error = {
            isError:true,
            message: `No pudimos cargar los datos por ${e}`
        }
        return error;
    }

}


const getItemsByLicence = async (params)=> {
    try {
        const [rows] = await conn.query('SELECT * FROM product INNER JOIN licence ON product.licence_id = licence.licence_id WHERE ?;', params); // no me manda limpio el json me trae row y fields
        return rows;

    } catch(e) {
        console.log( e);
        const error = {
            isError:true,
            message: `No pudimos cargar los datos por ${e}`
        }
        return error;
    }

}

const getAllCategories = async ()=> {
    try {
        const [rows] = await conn.query('SELECT * FROM category;');
        return rows;
    } catch(e) {
        const error = {
            isError:true,
            message: `No pudimos cargar los datos por ${e}`
        }
        return error;
    }

}

const getAllLicences = async ()=> {
    try {
        const [rows] = await conn.query('SELECT * FROM licence;');
        return rows;
    } catch(e) {
        const error = {
            isError:true,
            message: `No pudimos cargar los datos por ${e}`
        }
        return error;
    }

}

/*** Todo Cristian **/
const create = async (params) => {
    // console.log(params);
   try {
        // const [rows] = await conn.query('INSERT INTO productssss (product_name, product_description, price, stock, discount, sku, dues, image_front, image_back, licence_id, category_category_id) VALUES ?;', params);
        const [rows] = await conn.query('INSERT INTO product SET ?', params);
        const response = {
            isError: false,
            data: rows
        };


        //return response;
    }  catch (error) {
       console.log( error );
        const e = {
            isError: true,
            message: `Error al crear el registro: ${error}`
        };

        return e;
    } finally {
        await conn.releaseConnection();
    }
};



const edit = async (id, params) => {
    try {
        const [rows] = await conn.query('UPDATE product SET ? WHERE ?;', [id, params]);
        const response = {
            isError: false,
            message: `Producto modificado exitosamente.`,
            data: rows
        };
        return response;
    }  catch (error) {
        const e = {
            isError: true,
            message: `Error al modificar el registro: ${error}`
        };

        return e;
    } finally {
        await conn.releaseConnection();
    }
};

const deleteOne = async (params) => {
    try {
        const [rows] = await conn.query('DELETE FROM product WHERE ?;', params);
        const response = {
            isError: false,
            data: rows,
            message: `Producto eliminado exitosamente.`
        };
        return response;
    }  catch (error) {
        const e = {
            isError: true,
            message: `Error al eliminar el registro: ${error}`
        };

        return e;
    } finally {
        await conn.releaseConnection();
    }
};




module.exports = {
    getAll,
    getById,
    getItemsByLicence,
    getAllCategories,
    getAllLicences,
    create,
    edit,
    deleteOne
}
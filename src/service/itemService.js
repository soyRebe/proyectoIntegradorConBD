//import fetch from 'node-fetch';
const { getAll, getById, getItemsByLicence, edit,create,deleteOne, getAllCategories, getAllLicences } = require('../models/items');

const getItems = async () => {
  const items = await getAll();
  return items;
}

const getItemById = async (id) => {
  const item = await getById({ product_id: id });
  return await item;
}


const getProductsByLicence = async (params) => {
  const items = await getItemsByLicence(params);
  return await items;
}

const getProductsByCategories = async (params) => {
  const items = await getAllCategories(params);
  return await items;
}

const getLicences = async () => {
  const items = await getAllLicences();
  return await items;
}


 /*** Todo Cristian **/
const createProduct = async (item, files) => {
  const itemSchema = {
    product_name: item.name,
    product_description: item.description,
    price: item.price,
    stock: item.stock,
    discount: item.discount,
    sku: item.sku,
    dues: item.dues,
   // image_front: '/'+files[0].filename,
  //  image_back: '/'+files[1].filename,
    licence_id: item.licence,
    category_category_id: item.category
  }

  return await create(itemSchema);
}

const editProduct = async (id, item) => {
  const itemSchema = {
    product_name: item.name,
    product_description: item.description,
    price: item.price,
    stock: item.stock,
    discount: item.discount,
    sku: item.sku,
    dues: item.dues,
    image_front: '/imagen_front',
    image_back: '/imagen_front',
    licence_id: item.licence,
    category_id: item.category
  }

  return await edit(itemSchema, {product_id: id});
}

const deleteProduct = async (id) => {
  return await deleteOne({product_id: id});
}



  module.exports = {
    getItems,
    getItemById,
    getProductsByLicence,
    getProductsByCategories,
    getLicences,
    createProduct,
    edit: editProduct,
    delete: deleteProduct
  }
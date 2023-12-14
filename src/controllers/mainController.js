// import { getItems } from '../service/itemService';
const { getAll } = require('../models/items');
const itemService = require('../service/itemService')
const path = require('path');
const fs = require('fs');
const {getShopByItems} = require("../service/itemService");


const mainController = {
    home:( req, res )=> {       
       itemService.getItems().then( items => {
           //console.log(items);
           res.render('home',{
            title: 'Home | FunkoShop',
            items                  
        });
       });
        
    },
    contact: ( req, res )=> {  
        res.send('Route for Contact View');
    },
    about:( req, res )=> {
      res.send('Route for About View');
    },
    faqs:( req, res )=>{ 
        res.send('Route for Faqs View');
    },
   /* shop: ( req, res )=> {   
     itemService.getItems().then( items => { 
            res.render('shop', {
                title: 'Shop | FunkoShop',
                items
            });
        });
    },*/

    shop: ( req, res )=> {   
        itemService.getItems().then(items => {
            res.render('shop', {
                title: 'Shop | FunkoShop',
                items: items
            });
        })
              
       },

    getShopItemById: ( req, res )=> {  
        const id = req.params.id;
        itemService.getItems().then(items => {   
            itemService.getItemById( id ).then( item => {
                if (item) {
                    res.render('item',{
                        title: 'item | FunkoShop',
                        item: item,
                        items            
                    });
                } else {
                    res.render('page_error');
                }
            }).catch( () => {
                res.render('page_error');
            });

        }).catch( () => {
            res.render('page_error');
        });

    },


    getShopByItems: ( req, res )=> {
        if (req.query.search ) {
            const search = req.query.search;
            const params = {
                licence_name: search
            };
            itemService.getItems().then(items => {
                itemService.getProductsByLicence(params).then(items => {
                    console.log(items);
                    if (req.query.search) {

                        res.render('shop', {
                            title: 'Shop',
                            items: items,

                        });
                    } else {
                        res.render('shop', {
                            title: 'Shop',
                            items
                        });
                    }
                })
            }).catch(() => {
                res.render('page_error');
            });
        }
 },

    postShopItemById:( req, res )=> {
        const product_id = req.params.id;
        const quantity = req.body.quantity;

        res.send( 'Route post for item id: ' +  product_id + ' CANTIDAD: ' + quantity );
    },

    getCart:( req, res )=> {
      itemService.getItems().then(items => {
          res.render('carrito', {
              title: 'Carrito | FunkoShop',
              items
          });
      }).catch(() => {
          res.render('page_error');
      });

    },
    postCart:( req, res )=> { 
        res.send('Route for post cart view');
    },

   login:( req, res )=> {
        res.render('login', {
            title: 'Login | FunkoShop'
        });
       // res.sendFile(path.resolve(__dirname, '..' , 'pages', 'login.html' )); 
    },

    postLogin:( req, res )=> {
        res.send('route for login');
    },
    getRegister:( req, res )=> {
        res.render('register', {
            title: 'Registro | FunkoShop'
        });
    },
    postRegister:( req, res )=> {
        res.send('route for post register');
    },
    logout:( req, res )=> {
        res.render('login');
    },

    admin:( req, res )=> {
        const message = req.query.create || '';

        console.log(message);
        itemService.getItems().then(items => {
            res.render('listadoProductos', {
                title: 'Listado | FunkoShop',
                items: items,
                message
            })
        }).catch(()=>{
            res.render('page_error');
        });
    },

    poductList:( req, res ) => {
        res.render('listadoProductos');
    },

    getAdminCreate:( req, res )=> {
        itemService.getProductsByCategories().then(itemsCategoria => {
            itemService.getLicences().then(itemsAllLicences => {
                res.render('create', {
                    title: 'Listado | FunkoShop',
                    itemsCategoria: itemsCategoria,
                    itemsLicences: itemsAllLicences
                })
            })

        }).catch(()=>{
            res.render('page_error');
        });
    },

   postAdminCreate:( req, res)=> {
       const item = req.body;
       const files = req.files;

       itemService.createProduct(item, files).then(test => {
           res.redirect('/admin?create=ok');
       }).catch(()=>{
           res.render('page_error');
       });
   },

    getAdminEditItemById:( req, res )=> {
        const id = req.params.id;
        const item = req.body;
        itemService.edit(id, item).then( editar =>{
            res.render('edit', {
                title: 'Editar | FunkoShop'
            });
        }).catch(()=>{
            res.render('page_error');
        });



   },


    putAdminEditItemById:( req, res )=> {
    res.send('Route for edit admin view by id');
   },
   deleteAdmById:( req, res )=> {   
    res.send('Route for delete admin view by id');
   },




}

module.exports = mainController;
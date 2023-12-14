const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const uploadFiles = require('../middleware/uploadFiles');

router.get('/', mainController.admin);

router.get('/productList', mainController.poductList);

router.get('/create', mainController.getAdminCreate);

router.post('/create', uploadFiles.array('images', 2),mainController.postAdminCreate);

//router.put('/edit/', mainController.admEditItem);

router.get('/edit/:id', mainController.getAdminEditItemById);

router.put('/edit/:id', mainController.putAdminEditItemById);

//router.delete('/delete/:id', mainController.deleteAdmById);


module.exports = router;
const express = require('express');
const router = express.Router();
const shopscontroller = require('../controllers/shopscontroller');

router.get('/shops', shopscontroller.getAllShops);
router.get('/shops/:id', shopscontroller.getShopById);
router.post('/shops', shopscontroller.createShop);
router.put('/shops/:id', shopscontroller.updateShop);
router.delete('/shops/:id', shopscontroller.deleteShop);
router.get('/search',shopscontroller.searchShops);
router.post('/register',shopscontroller.register);
router.post('/login', shopscontroller.login);



module.exports = router;

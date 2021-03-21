const express = require('express');
const router = express.Router();
const controller = require('../controllers/order.js');


// Роут на getAll
router.get('/', controller.getAll);


// Роут на create
router.post('/', controller.create);

module.exports = router;
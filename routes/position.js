const express = require('express');
const router = express.Router();
const controller = require('../controllers/position.js');


// Роут на getByCategoryId
router.get('/:categoryId', controller.getByCategoryId);


// Роут на remove
router.post('/', controller.remove);


// Роут на create
router.patch('/:id', controller.create);


// Роут на update
router.delete('/:id', controller.update);

module.exports = router;
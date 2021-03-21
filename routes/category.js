const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.js');


// Роут на getAll
router.get('/', controller.getAll);


// Роут на getById
router.get('/:id', controller.getById);


// Роут на remove
router.delete('/:id', controller.remove);


// Роут на create
router.post('/', controller.create);


// Роут на update
router.patch('/:id', controller.update);




module.exports = router;
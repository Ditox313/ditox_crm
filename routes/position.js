const express = require('express');
const router = express.Router();
const controller = require('../controllers/position.js');


// Роут на getByCategoryId
router.get('/:categoryId', controller.getByCategoryId);


// Роут на remove
router.post('/', passport.authenticate('jwt',{session: false}), controller.remove);


// Роут на create
router.patch('/:id', passport.authenticate('jwt',{session: false}), controller.create);


// Роут на update
router.delete('/:id',  passport.authenticate('jwt',{session: false}),  controller.update);

module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/order.js');


// Роут на getAll
router.get('/', passport.authenticate('jwt',{session: false}), controller.getAll);


// Роут на create
router.post('/', passport.authenticate('jwt',{session: false}), controller.create);

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');


// Роут на login
router.get('/login', controller.login);


// Роут на register
router.get('/auth', controller.register);

module.exports = router;
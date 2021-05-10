const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/auth.js');


// Роут на login
router.post('/login', controller.login);


// Роут на register
router.post('/register', controller.register);

module.exports = router;
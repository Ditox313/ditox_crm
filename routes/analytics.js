const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/analytics.js');


// Роут на overview
router.get('/overview', controller.overview);


// Роут на analytics
router.get('/analytics', controller.analytics);

module.exports = router;
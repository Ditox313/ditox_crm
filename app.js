const express = require('express');
const authRoutes = require('./routes/auth.js');
const analyticsRoutes = require('./routes/analytics.js');
const categoryRoutes = require('./routes/category.js');
const orderRoutes = require('./routes/order.js');
const positionRoutes = require('./routes/position.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();



// Регистрируем Morgan 
app.use(morgan('dev'));

// Регистрируем Cors
app.use(cors());


// Регистрируем модуль bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



// Регистрируем роут auth
app.use('/api/auth', authRoutes);


// Регистрируем роут analytics
app.use('/api/analytics', analyticsRoutes);


// Регистрируем роут category
app.use('/api/category', categoryRoutes);


// Регистрируем роут order
app.use('/api/order', orderRoutes);


// Регистрируем роут position
app.use('/api/position', positionRoutes);









module.exports = app;
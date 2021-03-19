const express = require('express');
const authRoutes = require('./routes/auth.js');
const app = express();

// Регистрируем роут auth
app.use('/api/auth', authRoutes);


module.exports = app;
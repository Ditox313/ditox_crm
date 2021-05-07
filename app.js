const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const authRoutes = require('./routes/auth.js');
const analyticsRoutes = require('./routes/analytics.js');
const categoryRoutes = require('./routes/category.js');
const orderRoutes = require('./routes/order.js');
const positionRoutes = require('./routes/position.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const keys = require('./config/keys.js');
const app = express();



// Подключаемся к MongoDB
mongoose.connect(keys.mongoUri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(function(){
    console.log('Мы подключились к БД!!!');
})
.catch(function(error){
    console.log(error);
});




// Инициализируем passport и подключаем файл обработчик для логики защиты и проверки роутов
app.use(passport.initialize());
require('./middleware/passport')(passport);




// Регистрируем Morgan 
app.use(morgan('dev'));


// Добавляем возможность отдавать с сервера картинки по запросу. (Когда будет запрос к uploads, делай эту папку статической)
app.use('/uploads', express.static('uploads'));

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
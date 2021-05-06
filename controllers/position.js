const bodyParser = require('body-parser');
const Position = require('../models/Position');
const errorHandler = require('../Utils/errorHendler');

// Контроллер для getByCategoryId(Получение всех позиций по Id категории)
module.exports.getByCategoryId = async function (req, res) {
    try {
        // Ищем в таблице позиции по 2 параметрам
        const positions = await Position.find({
            category: req.params.categoryId,
            user: req.user.id
        });

        // Возвращаем пользователю позиции 
        res.status(200), json(positions);
    } catch (e) {
        errorHandler(res, e);
    }
};


// Контроллер для remove
module.exports.remove = function (req, res) {
    try {

    } catch (e) {
        errorHandler(res, e);
    }
};


// Контроллер для create
module.exports.create = function (req, res) {
    try {

    } catch (e) {
        errorHandler(res, e);
    }
};


// Контроллер для update
module.exports.update = function (req, res) {
    try {
        
    } catch (e) {
        errorHandler(res, e);
    }
};

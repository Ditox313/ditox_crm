const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../Utils/errorHendler');






// Контроллер для getAll(получить все категории который создал пользователь)
module.exports.getAll = async function (req, res) {
    try {
        const categories = await Category.find({
            user: req.user.id //Ищем категории по пользователю который их создал
        });
        res.status(200).json(categories);
    } catch (e) {
        errorHandler(res, e);
    }
};


// Контроллер для getById
module.exports.getById = async function (req, res) {
    try {
        const categories = await Category.findById(req.params.id ); //Ищем категорию по id из переданных параметров
        res.status(200).json(categories);
    } catch (e) {
        errorHandler(res, e);
    }
};


// Контроллер для remove(Удалить категорию по id)
module.exports.remove = async function (req, res) {
    try {
        await Category.remove({
            _id: req.params.id //Удаляем категорию по id
        });

        await Category.remove({
            category: req.params.id //Удаляем позиции из этой категории
        });

        // Возвращаем результат
        res.status(200).json({
            message: "Категория удалена"
        });
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


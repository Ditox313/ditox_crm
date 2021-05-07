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


// Контроллер для create(создаем категорию)
module.exports.create = async function (req, res) {
    try {
        console.log(req.file);
        const category = new Category({
            name: req.body.name,
            user: req.user.id,
            imageSrc: req.file ? req.file.path : '' //Если файл загружен то задаем путь до файла
        });

        await category.save(); //Сохраняем созданную категорию

        res.status(201).json(category);
        
    } catch (e) {
        errorHandler(res, e);
    }
};


// Контроллер для update
module.exports.update = async function (req, res) {
    try {
        const updated = {
            name: req.body.name,
        };

        // Если объект file есть,то заполняем параметр путем фала
        if(file)
        {
            updated.imageSrc = req.file.path;
        }
        

        const category = await Category.findOneAndUpdate(
            {_id: req.params.id,}, //Ищем по id
            {$set: updated}, //Обновлять мы будем body запроса. В updated находятся данные на которые будем менять старые
            {new: true} //обновит позицию и верет нам уже обновленную
        );

        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
};


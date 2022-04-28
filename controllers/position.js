const bodyParser = require('body-parser');
const Position = require('../models/Position');
const errorHandler = require('../Utils/errorHendler');





// Контроллер для getByCategoryId(Получение всех позиций по Id категории)
module.exports.getByCategoryId = async function(req, res) {
    try {
        // Ищем в таблице позиции по 2 параметрам( по дефолту 1 параметр)
        const positions = await Position.find({
            category: req.params.categoryId,
            user: req.user.id //Эти данные берем из объекта user который добавил пасспорт в запрос !!!
        });

        // Возвращаем пользователю позиции 
        res.status(200).json(positions);
    } catch (e) {
        errorHandler(res, e);
    }
};






// Контроллер для remove(Удаляем позицию)
module.exports.remove = async function(req, res) {
    try {
        await Position.remove({
            _id: req.params.id
        });

        // Возвращаем результат
        res.status(200).json({
            message: "Позиция была удалена"
        });
    } catch (e) {
        errorHandler(res, e);
    }
};






// Контроллер для create(Создаем позицию)
module.exports.create = async function(req, res) {
    try {
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            cost2: req.body.cost2,
            cost3: req.body.cost3,
            cost4: req.body.cost4,
            cost5: req.body.cost5,
            dopWash: req.body.dopWash,
            dopPetrol: req.body.dopPetrol,
            dopKindPlace: req.body.dopKindPlace,
            dopBuster: req.body.dopBuster,
            dopBattery: req.body.dopBattery,
            dopAux: req.body.dopAux,
            dopVideo: req.body.dopVideo,
            dopAntiradar: req.body.dopAntiradar,
            category: req.body.category,
            user: req.user.id
        }).save();

        // Возвращаем пользователю позицию которую создали 
        res.status(201).json(position);
    } catch (e) {
        errorHandler(res, e);
    }
};






// Контроллер для update
module.exports.update = async function(req, res) {
    try {

        // Находим и обновляем позицию. 
        const position = await Position.findOneAndUpdate({ _id: req.params.id, }, //Ищем по id
            { $set: req.body }, //Обновлять мы будем body запроса. В req.body находятся данные на которые будем менять старые
            { new: true } //обновит позицию и верет нам уже обновленную
        );

        // Возвращаем пользователю обновленную позицию 
        res.status(200).json(position);
    } catch (e) {
        errorHandler(res, e);
    }
};
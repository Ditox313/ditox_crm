const Order = require('../models/Order');
const errorHandler = require('../Utils/errorHendler');







// Контроллер для getAll(Получаем список всех заказов)
// http://localhost:5000/api/order?offset=3&limit=5

module.exports.getAll = async function (req, res) {
    try {
        
        // Создаем объект запроса
        const query = {
            user: req.user.id //Покажем заказы только тому юзеру, который запросил данный роут
        }


        // Фильтр по дате(Если будет дата старта с которой нужно начать фильтрацию)
        if(req.query.start)
        {
            // То мы создаем поле date и заполняем значение >= дата старта
            query.date = {
                $gte: req.query.start
            };
        }


        // Нужно получить заказы которые <= даты конца
        if (req.query.end) {
            if(!query.date)
            {
                query.date = {};
            }

            query.date['$lte'] = req.query.end;
        }


        // Получае  конкретный ордер если это требуется
        if (req.query.order)
        {
            query.order = +req.query.order;
        }



        // Ищем наши заказы и сортируем их
        const orders = await Order.find(query)
        .sort({date: -1})
        .skip(+req.query.offset) //Отступ для бесконечного скрола на фронтенде. Приводим к числу
        .limit(+req.query.limit); //Сколько выводить на фронтенде. Приводим к числу

        res.status(200).json(orders);
    } catch (e) {
        errorHandler(res, e);
    }
};









// Контроллер для create
module.exports.create = async function (req, res) {
     try {
        // Ищем номер последнего заказа
        const lastOrder = await Order.findOne({
            user: req.user.id
        })
        .sort({date: -1});

        // Если мы нашли предполагаемы последнйи заказ, то устанвливает поле order
        const maxOrder = lastOrder ? lastOrder.order : 0;


        const order = new Order({
            list: req.body.list,
            user: req.user.id,
            order: maxOrder + 1
        }).save();

        res.status(201).json(order);
     } catch (e) {
         errorHandler(res, e);
     }
};

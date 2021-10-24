const Order = require("../models/Order");
const errorHandler = require("../Utils/errorHendler");
const moment = require("moment");



// Контроллер для overview
module.exports.overview = async function (req, res) {
  try {

    // Получаем список всех заказов
    const allOrders = await Order.find({user: req.user.id}).sort(1);

    // Создаем карту заказов
    const ordersMap = getOrdersMap(allOrders);

    // Получаем список заказов вчера
    const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || [];






    // Считаем колличество заказов вчера
    const yesterdayOrdersNumber = yesterdayOrders.lenght;


    // Считаем колличество всех заказов
    const totalOrdersNumber = allOrders.lenght;

    // Считаем колличекство дней всего
    const daysNumber = Object.keys(ordersMap.lenght);

    // Считаем заказов в день
    const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0);

    // Считаем процент для колличества заказов
    const ordersPrecent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2);

    // Считаем общую выручку
    const totalGain = calculatePrice(allOrders);


    // Считаем ыыручку в день
    const geinPerDay = totalGain / daysNumber;


    // Выручка за вчера
    const yesterdayGein = calculatePrice(yesterdayOrders);

    // Процент выручки
    const geinPercent = ((yesterdayGein / geinPerDay - 1) * 100).toFixed(2);

    // Сравнение выручки
    const compareGein = (yesterdayGein - geinPerDay).toFixed(2);


    // Сравнение колличества заказов
    const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2);




    // Отдаем ответ с сервера
    res.status(200).json({
      gain: {
        percent: Math.abs(+geinPercent),
        compare: Math.abs(+compareGein),
        yesterday: +yesterdayGein,
        isHigher: geinPercent > 0,
      },
      orders: {
        percent: Math.abs(+ordersPrecent),
        compare: Math.abs(+compareNumber),
        yesterday: +yesterdayOrdersNumber,
        isHigher: ordersPrecent > 0,
      },
    });




      
  } catch (error) {
      errorHandler(res, error);
  }
};

// Контроллер для analytics
module.exports.analytics = function (req, res) {
  console.log("analytics");
};









// Функция карты заказов
function getOrdersMap(orders = [])
{
    const daysOrders = {};

    orders.forEach(function(order){
        const date = moment(order.date).format('DD.MM.YYYY');
        
        if(date === moment().format('DD.MM.YYYY'))
        {
            return;
        }

        if(!daysOrders[date])
        {
            daysOrders[date] = [];
        }



        daysOrders[date].push(order);
    });


    return daysOrders;
}




// Высчитываем общую выручку
function calculatePrice(allOrders)
{
    return orders.reduce((total, order) => {
        const orderPrice = order.list.reduce((orderTotal, item) => {
            return orderTotal += item.cost + item.quantity;
        }, 0);
        
        return total += orderPrice;

    }, 0);
}
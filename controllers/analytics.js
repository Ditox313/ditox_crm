const Order = require("../models/Order");
const errorHandler = require("../Utils/errorHendler");
const moment = require("moment");

// Контроллер для overview
module.exports.overview = async function (req, res) {
  try {
    // Получаем список всех заказов
    const allOrders = await Order.find({});

    // Считаем колличество всех заказов
    const totalOrdersNumber = Object.keys(allOrders).length;

    // Создаем карту заказов
    const ordersMap = getOrdersMap(allOrders);

    // Получаем список заказов вчера
    const yesterdayOrders = ordersMap[moment().add(-1, "d").format("DD.MM.YYYY")] || [];


    // Считаем колличество заказов вчера
    const yesterdayOrdersNumber = Object.keys(yesterdayOrders).length; 


    // Считаем колличекство дней всего
    const daysNumberMath = Object.keys(ordersMap); 
    const daysNumber = Object.keys(daysNumberMath).length;


    // Считаем заказов в день
    const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0);



    // Считаем процент для колличества заказов
    const ordersPrecent = ((yesterdayOrdersNumber / ordersPerDay - 1) * 100).toFixed(2);


    // Считаем общую выручку
    const totalGain = calculatePrice(allOrders);


    // Считаем выручку в день
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
        percent: Math.abs(+geinPercent) || 0,
        compare: Math.abs(+compareGein) || 0,
        yesterday: +yesterdayGein || 0,
        isHigher: geinPercent > 0,
      },
      orders: {
        percent: Math.abs(+ordersPrecent) || 0,
        compare: Math.abs(+compareNumber) || 0,
        yesterday: +yesterdayOrdersNumber || 0,
        isHigher: ordersPrecent > 0,
      },
    });
  } catch (error) {
    errorHandler(res, error);
  }
};







// Контроллер для analytics
module.exports.analytics = async function (req, res) {
   try {
     // Находим все заказы
     const allOrders = await Order.find({}).sort({ date: 1 });

     // Создаем карту заказов
     const ordersMap = getOrdersMap(allOrders);

     // Высчитываем средний чек
     const average = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2);


     // Формируем ось х
     const chart = Object(keys).map((label) => {
      const gein = calculatePrice(ordersMap[label]);
      const order = ordersMap[label].length;


      return {label, gein, order}
     });




     // Отдаем ответ с сервера
     res.status(200).json({
       average: average,
       chart: chart,


     });
   } catch (error) {
     errorHandler(res, error);
   }
};









// Функция карты заказов
function getOrdersMap(orders) {
  const daysOrders = {};

  orders.forEach(function (order) {
    const date = moment(order.date).format("DD.MM.YYYY");

    if (date === moment().format("DD.MM.YYYY")) {
      return;
    }

    if (!daysOrders[date]) {
      daysOrders[date] = [];
    }

    daysOrders[date].push(order);
  });

  return daysOrders;
}




// Высчитываем общую выручку
function calculatePrice(orders = []) {
  return orders.reduce((total, order) => {
    const orderPrice = order.list.reduce((orderTotal, item) => {
      return (orderTotal += item.cost * item.quantity);
    }, 0);

    return (total += orderPrice);
  }, 0);
}

// Подключаем ядро приложееия
const app = require('./app.js');
const port = process.env.port || 5000;


// Запускаем сервер
app.listen(port, function () {
    console.log(`Сервер работает на порте ${port}`);
});




const User = require('../models/User.js');



// Контроллер для Login
module.exports.login = function(req, res){
    res.status(200).json({
        "page": "Login"
    });
};

// Контроллер для Auth
module.exports.register = async function (req, res) {

    // Делаем проверку на наличие пользователя в БД
    const canditate = await  User.findOne({
        email: req.body.email
    });

    if (canditate)
    {
        res.status(409).json({
            message: "Такой Email уже существует в системе. Проверьте правильность введенных данных!"
        });
    } 
    else
    {
        // Сохранить пользователя
    }
};
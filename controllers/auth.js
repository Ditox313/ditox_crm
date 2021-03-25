const bcrypt = require('bcryptjs');
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
        // Шифрование пароля пользователя
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;


        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            // Отправить ошибку
        }
    }
};
const User = require('../models/User.js');



// Контроллер для Login
module.exports.login = function(req, res){
    res.status(200).json({
        "page": "Login"
    });
};

// Контроллер для Auth
module.exports.register = function (req, res) {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save().then(function(){
        console.log('Пользователь создан!!!');
    });
};
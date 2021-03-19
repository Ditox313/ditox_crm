
// Контроллер для Login
module.exports.login = function(req, res){
    res.status(200).json({
        "page": "Login"
    });
};

// Контроллер для Auth
module.exports.register = function (req, res) {
    res.status(200).json({
        "page": "Auth"
    });
};
// Подключаем пакет для работы с загрузкой файлов
const multer = require('multer');

// Пакет для удобной работы с данными в js
const moment = require('moment');








// Создаем переменную storage. Она описывает как будут хранится и где будут хранится загруженный файлы. 
const storage = multer.diskStorage({
    // Куда сохраняем файл
    destination(req,file,callback){
        callback(null, '/uploads');
    },
    // С каким именем сохраняем
    filename(req, file, callback) {
        const date = moment().format('DDMMYYYY-HHmmss_SS') ;
        callback(null, `${date}-${file.originalname}`);
    }
});



// Валидатор
const fileFilter = function (req, file, callback) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg')
    {
         callback(null, true);
    }
    else
    {
        callback(null, false);
    }
};



// Лимитирование размера
const limits = {
    fileSize: 1024 * 1024 *5
};





module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
});
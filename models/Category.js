const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему (описание рядов и полец) для таблицы categories

const categoriesSchema = new Schema({
    // Создаем поле с именем категории
    name: {
        type: String,
        required: true,
    },

    // Создаем поле изображения категории
    imageSrc: {
        type: String,
        default: '',
    },

    // Создаем поле с ID юзера
    user: {
        ref: 'users',// Аналог внешнего ключа php
        type: Schema.Types.ObjectId
    }
});


// Создаем таблицу category
module.exports = mongoose.model('categories', categoriesSchema);
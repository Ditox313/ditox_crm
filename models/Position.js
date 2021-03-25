const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы positions

const positionSchema = new Schema({
    // Создаем поле с именем позиции
    name: {
        type: String,
        required: true,
    },

    // Создаем поле цены позиции
    cost: {
        type: Number,
        required: true,
    },

    // Создаем поле с ID категории
    category: {
        ref: 'categories', 
        type: Schema.Types.ObjectId
    },


    // Создаем поле с ID юзера
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});


// Создаем таблицу positions
module.exports = mongoose.model('positions', positionSchema);
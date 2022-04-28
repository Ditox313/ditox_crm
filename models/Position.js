const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы positions

const positionSchema = new Schema({
    // Создаем поле с именем позиции
    name: {
        type: String,
        required: true,
    },

    // Создаем поле цены позиции 1
    cost: {
        type: Number,
        required: true,
    },

    // Создаем поле цены позиции 2
    cost2: {
        type: Number,
        required: true,
    },

    // Создаем поле цены позиции 3
    cost3: {
        type: Number,
        required: true,
    },

    // Создаем поле цены позиции 4
    cost4: {
        type: Number,
        required: true,
    },

    // Создаем поле цены позиции 5
    cost5: {
        type: Number,
        required: true,
    },


    // Создаем поле доп.параметр(Мойка автомобиля)
    dopWash: {
        type: Number,
        required: false,
    },

    // Создаем поле доп.параметр(Дозаправка)
    dopPetrol: {
        type: Number,
        required: false,
    },

    // Создаем поле доп.параметр(Детское кресло)
    dopKindPlace: {
        type: Number,
        required: false,
    },

    // Создаем поле доп.параметр(Бустер)
    dopBuster: {
        type: Number,
        required: false,
    },

    // Создаем поле доп.параметр(Зарядное устройство)
    dopBattery: {
        type: Number,
        required: false,
    },

    // Создаем поле доп.параметр(Кабель AUX)
    dopAux: {
        type: Number,
        required: false,
    },

    // Создаем поле доп.параметр(Видеорегистратор)
    dopVideo: {
        type: Number,
        required: false,
    },

    // Создаем поле доп.параметр(Антирадар)
    dopAntiradar: {
        type: Number,
        required: false,
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
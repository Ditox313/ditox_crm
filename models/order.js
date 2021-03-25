const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Создаем схему для таблицы orders

const orderSchema = new Schema({
    // Создаем поле с датой заказа
    date: {
        type: Date,
        default: Date.now,
        unique: true
    },

    // Создаем поле с порядковым номером заказа
    order: {
        type: Number,
        required: true,
    },


    // Создаем поле для списка товаров в заказе
    list: [
        {
            name: {
                type: String,
            },
            quantity: {
                type: Number,
            },
            cost: {
                type: Number,
            }
        }
    ],



    // Создаем поле с ID юзера
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }

});


// Создаем таблицу orders
module.exports = mongoose.model('orders', orderSchema);
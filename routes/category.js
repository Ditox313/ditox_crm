const express = require('express');
const passport = require('passport');
const upload = require('../middleware/upload');
const router = express.Router();
const controller = require('../controllers/category.js');



// Роут на getAll
router.get('/',passport.authenticate('jwt',{session: false}), controller.getAll);


// Роут на getById
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById);


// Роут на remove
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove);


// Роут на create с загрузкой картинки
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.create); //image - ключ, показывающий что загружаем в body


// Роут на update
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update);




module.exports = router;
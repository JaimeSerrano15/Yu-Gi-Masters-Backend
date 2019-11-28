//Se crean las variables que usa el Express y la variable que toma el controlador de llos mazos
var express = require("express");
var router = express.Router();
var deckController = require('../controllers/DeckController');

//Ruta que llama al módulo del controlador que se encarga de buscar todas las cartas que están registradas en la base
router.get('/', deckController.getAll);

//Ruta que llama al módulo del controlador que busca un mazo en específico por medio del nombre, utilizando el método GET
router.get('/:name', deckController.getOne);

//Ruta que llama al módulo del controlador que guarda un mazo en la base, utilizando el método POST 
router.post('/save', deckController.save);

router.post('/addcard', deckController.saveCard);

//Ruta que llama al módulo del controlador que busca un deck en específico y permite modificarlo, utilizando el método PUT
router.put('/:name', deckController.update);

//Ruta que llama al módulo del controlador que busca un mazo y lo elimina de la base, utilizando el método DELETE
router.delete('/:title', deckController.delete);

module.exports = router;
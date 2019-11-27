//Se crean las variables que usa el Express y la variable que toma el controlador de los foros
var express = require('express');
var router = express.Router();
var forumController = require('../controllers/ForumControler');

//Ruta que llama al módulo del controlador que permite buscar todos los foros registrados
router.get('/', forumController.getAll);

//Ruta que llama al módulo del controlador que permite buscar un foro en específico, utilizando el método de GET
router.get('/:name', forumController.getOne);

//Ruta que llama al módulo del controlador que guarda dentro de la base un foro, utilizando el método POST
router.post('/save', forumController.save);

//Ruta que llama al módulo del controlador que elimina un foro con el nombre como parámetro, utilizando el método DELETE
router.delete('/:name', forumController.delete);

module.exports = router;
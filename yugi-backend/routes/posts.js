//Se crean las variables que usa el Express y la variable que toma el controlador de las cartas
var express = require('express');
var router = express.Router();
var postController = require('../controllers/PostController');

//Ruta que llama al controlador a buscar todos los post que hayan sido ingresados 
router.get('/', postController.getAll);

//Ruta que llama al controlador a buscar un post en específico, usando el método GET
router.get('/:tittle', postController.getOne);

//Ruta que llama al controlador a guardar un post, usando el método POST
router.post('/save', postController.save);

//Ruta que llama a la pagína principal luego de haber guardado un post, usando método GET
router.get('/save', (req,res,next)=>{
    res.render('index');
})

//Ruta que llama al controlador que busca un post en específico y procede a borrarlo, usando método DELETE
router.delete('/:tittle', postController.delete);

module.exports = router;
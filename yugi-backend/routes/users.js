//Se crean las variables que usa el Express y la variable que toma el controlador de los usuarios
var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');

//Ruta que llama al módulo del controlador que guarda un usuario nuevo, usando el método POST
router.post('/', (req, res, next)=>{
  userController.save(req, res, next);
})

//Ruta que llama al módulo del controlador que busca todos los usuarios que han sido registrados, usando el método GET
router.get('/', userController.getAll);

//Ruta que llama al módulo del controlador que busca a un usuario en específico, usando el método POST
router.get('/:name', userController.getOne);

//Ruta que llama al módulo del controlador que permite al usuario ingresar sesión con las credenciales que se han
//sido ingresadas, usando el método POST
router.post('/log', userController.logIn);

module.exports = router;

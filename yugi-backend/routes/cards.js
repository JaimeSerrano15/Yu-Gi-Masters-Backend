//Se crean las variables que usa el Express y la variable que toma el controlador de las cartas
var express = require('express');
var router = express.Router();
var cardController = require('../controllers/CardController');

//Ruta utilizada para mandar a llamar quien exporta todas las cartas de la base con el método GET
router.get('/', function(req,res,next){
    cardController.getAll(req, res, next);
});

//Ruta utilizada para mandar a llamar quien exporta una carta en específica con el método GET
router.get('/:name', cardController.getOne);

//Ruta utilizada para llamar el controlador que guarda las cartas con el método POST
router.post('/', function(req,res,next){
    cardController.save(req,res,next);
    console.log("Hay que crear cartas");
    console.log("Prueba");
})

/*router.get('/', function(req,res,nect){
    //res.render('welcome');
})*/

//Ruta utilizada para llamar el controlador que busca y borra una carta de la base con el método DELETE
router.delete('/:name', cardController.delete);


module.exports = router;
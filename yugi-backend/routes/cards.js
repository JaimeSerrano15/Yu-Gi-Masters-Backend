var express = require('express');
var router = express.Router();
var cardController = require('../controllers/CardController');

router.get('/', function(req,res,next){
    cardController.getAll(req, res, next);
});

router.get('/:name', cardController.getOne);

router.post('/', function(req,res,next){
    cardController.save(req,res,next);
    console.log("Hay que crear cartas");
    console.log("Prueba");
})

/*router.get('/', function(req,res,nect){
    //res.render('welcome');
})*/

router.delete('/:name', cardController.delete);


module.exports = router;
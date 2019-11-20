var express = require('express');
var router = express.Router();
var cardController = require('../controllers/CardController');

router.get('/', function(req,res,next){
    res.render('CardForm');
});

router.get('/:name', cardController.getOne);

router.post('/', function(req,res,next){
    cardController.save(req,res,next);
    console.log("Hay que crear cartas");
    console.log("Prueba");
})

module.exports = router;
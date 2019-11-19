var express = require('express');
var router = express.Router();
var cardController = require('../controllers/CardController');

router.get('/', function(req,res,next){
    res.render('CardForm');
});

router.post('/', function(req,res,next){
    cardController.save(req,res,next);
    console.log("Hay que crear cartas");
})

module.exports = router;
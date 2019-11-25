var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('PostCreation');
});

router.get('/prueba', function(req,res,next){
  res.render('welcome')
})

module.exports = router;

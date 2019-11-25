var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/info', function(req,res,next){
  res.render('info');
})

router.get('/login', function(req,res,next){
  res.render('login');
})

module.exports = router;

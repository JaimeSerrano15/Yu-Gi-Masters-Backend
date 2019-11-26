var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Show_Post', { in: false});
});

router.post('/', function(req,res,next){
  var newUser = {
    name: req.body.name,
    password: req.body.pass,
    email: req.body.mail
  }

  axios.post('http://localhost:3001/users', newUser).then((ros)=>{
    res.redirect('/login');
  })

})

router.get('/info', function(req,res,next){
  res.render('info');
})

router.get('/login', function(req,res,next){
  res.render('login');
})

router.post('/login', function(req,res,next){
  var confirm = {
    name: req.body.name,
    password: req.body.pass
  }

  console.log("Ready to Log");

  axios.post('http://localhost:3001/users/log', confirm).then((ros)=>{
    if(ros.data.auth){
      console.log("Usuario loggeado")
      res.redirect('/home');

    }
    else{
      res.redirect('/login');
    }
  })
})

router.get('/home', function(req,res,next){
  res.render('HomePage');
})

module.exports = router;

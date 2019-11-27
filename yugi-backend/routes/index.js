//Se crean las variables que usa el Express y Axios
var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { in: false});
});

//Permite crear un usuario con los datos ingresados, redireccionando a la ruta de inicio de sesión por medio de Axios
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

//Ruta que manda a renderizar y mostrar la pestaña de información
router.get('/info', function(req,res,next){
  res.render('info');
})

//Ruta que manda a renderizar y mostrar la pestaña de inicio de sesión
router.get('/login', function(req,res,next){
  res.render('login');
})

//Ruta que sirve para iniciar sesión con un usuario previamente registrado. Si se confirma que el usuario es existente,
//se procede a redireccionar hacia la pestaña de Home por medio de Axios
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

//Ruta que renderiza y muestra la página principal de la página
router.get('/home', function(req,res,next){
  res.render('HomePage');
})

module.exports = router;

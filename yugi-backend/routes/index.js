//Se crean las variables que usa el Express y Axios
var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { noup: null});
});

//Permite crear un usuario con los datos ingresados, redireccionando a la ruta de inicio de sesión por medio de Axios
router.post('/', function(req,res,next){
  var newUser = {
    name: req.body.name,
    password: req.body.pass,
    email: req.body.mail
  }

  axios.post('http://localhost:3001/users', newUser).then((ros)=>{
    if(ros.data.registed){
      res.redirect('/login');
    }else{
      res.render('register', {noup: 'nice'});
    }
  })

})

//Ruta que manda a renderizar y mostrar la pestaña de información
router.get('/info', function(req,res,next){
  res.render('Informacion');
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
  axios.get('http://localhost:3001/forums/').then((ros)=>{
    res.render('HomePage', {forums: ros.data})
  })
})

//Ruta que renderiza y muestra la página de creación de foro
router.get('/crforum', function(req,res,next){
  res.render('ForumCreation');
})

//Ruta que muestra la creación de foros, y confirma si el foro ha sido guardado exitosamente o no. Luego, vuelve a cargar la misma 
//pestaña de creación
router.post('/crforum', function(req,res,next){
  var newForum = {
    name: req.body.name
  }

  console.log(newForum);
  axios.post('http://localhost:3001/forums/save', newForum).then((ros)=>{
    console.log(ros.data);
    if(ros.data.registed){
      res.redirect('/crforum');
    }
    else{
      console.log("No se guardó en el foro");
      res.redirect('crforum');
    }
  })
})

//
router.get('/crpost', function(req,res,next){
  res.render('PostCreation');
})

//Ruta que se usa para crear un post nuevo con título y contenido. El Axios se encarga de postearlo. Si lo guarda, recarga la página de 
//creación de post
router.post('/crpost', function(req,res,next){
  var newPost = {
    tittle: req.body.tittle,
    content: req.body.content
  }

  axios.post('http://localhost:3001/posts/save', newPost).then((ros)=>{
    if(ros.data.registered){
      res.redirect('/crpost');
    }
    else{
      console.log("No se ha creado ningún post:(");
    }
  })
})

//Ruta que llama la página para crear un mazo
router.get('/crdeck', function(req,res,next){
  axios.get('http://localhost:3001/cards/').then((ros)=>{
    axios.get('http://localhost:3001/decks').then((ras)=>{
      res.render('Crear_Mazo', {cd: ros.data, mz: ras.data})
    })
  })
})

router.post('/crdeck', function(req,res,next){
  var newDeck = {
    name: req.body.ndeck
  }

  console.log("AHHHHH " + req.body.ndeck);
  if(req.body.ndeck){
    axios.post('http://localhost:3001/decks/save', newDeck).then((ros)=>{
      res.redirect('/crdeck');
    })
  }
  else{
    var addCard = {
      deck: req.body.onemz,
      thecard: req.body.selec
    }

    axios.post("http://localhost:3001/decks/addcard", addCard).then((ros)=>{
      if(ros.data.saved){
        res.redirect('/crdeck');
      }
    })

  }

})

//Ruta que muestra la pestaña de foro
router.get('/shforo', function(req,res,next){
  axios.get('http://localhost:3001/posts').then((ras)=>{
    console.log(ras.data);
    res.render('Show_Forum', {posts: ras.data});
  })
})

//Ruta que muestra un post
router.get('/shpost', function(req,res,next){
  res.render ('Show_Post')
})

//Ruta que muestra la página donde se ingresan las cartas nuevas
router.get('/crform', function(req,res,next){
  res.render ('CardForm')
})

//Ruta que muestra la página donde se hace la búsqueda de cartas
router.get('/bcarta', function(req,res,next){
  res.render('Buscar_Carta')
})

router.post('/bcarta', function(req,res,next){
  var searched = req.body.buscar;
  console.log(searched);

  axios.get(`http://localhost:3001/cards/${searched}`).then((ros)=>{
    if(ros.data){
      console.log(ros.data);
      res.render('Buscar_Carta', {acard: ros.data});
    }
    else{
      res.redirect('/bcarta');
    }
  })

})

module.exports = router;

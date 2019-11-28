var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { noup: null});
});

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

router.get('/info', function(req,res,next){
  res.render('Informacion');
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
  axios.get('http://localhost:3001/forums/').then((ros)=>{
    res.render('HomePage', {forums: ros.data})
  })
})

router.get('/crforum', function(req,res,next){
  res.render('ForumCreation');
})

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

router.get('/crpost', function(req,res,next){
  res.render('PostCreation');
})

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

router.get('/crdeck', function(req,res,next){
  axios.get('http://localhost:3001/cards/').then((ros)=>{
    res.render('Crear_Mazo', {cd: ros.data});
    console.log("push");
  })
})

router.get('/shforo', function(req,res,next){
  axios.get('http://localhost:3001/posts').then((ras)=>{
    console.log(ras.data);
    res.render('Show_Forum', {posts: ras.data});
  })
})

router.get('/shpost', function(req,res,next){
  res.render ('Show_Post')
})

router.get('/crform', function(req,res,next){
  res.render ('CardForm')
})

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

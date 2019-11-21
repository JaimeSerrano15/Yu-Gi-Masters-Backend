var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');

router.post('/register', (req, res, next)=>{
  userController.save(req, res, next);

})

router.get('/', userController.getAll);

router.get('/:name', userController.getOne);

router.post('/log', userController.logIn);

module.exports = router;

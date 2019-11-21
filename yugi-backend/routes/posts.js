var express = require('express');
var router = express.Router();
var postController = require('../controllers/PostController');

router.get('/', postController.getAll);

router.get('/:tittle', postController.getOne);

router.post('/save', postController.save);

router.get('/save', (req,res,next)=>{
    res.render('index');
})

router.delete('/:tittle', postController.delete);

module.exports = router;
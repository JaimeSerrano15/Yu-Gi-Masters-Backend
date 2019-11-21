var express = require('express');
var router = express.Router();
var postController = require('../controllers/PostController');

router.get('/', postController.getAll);

router.get('/:tittle', postController.getOne);

router.get('/save', postController.save);

router.delete('/:tittle', postController.delete);

module.exports = router;
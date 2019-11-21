var express = require('express');
var router = express.Router();
var forumController = require('../controllers/ForumControler');

router.get('/', forumController.getAll);

router.get('/:name', forumController.getOne);

router.post('/save', forumController.save);

router.delete('/:name', forumController.delete);

module.exports = router;
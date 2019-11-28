var express = require("express");
var router = express.Router();
var deckController = require('../controllers/DeckController');

router.get('/', deckController.getAll);

router.get('/:name', deckController.getOne);

router.post('/save', deckController.save);

router.post('/addcard', deckController.saveCard);

router.put('/:name', deckController.update);

router.delete('/:title', deckController.delete);

module.exports = router;
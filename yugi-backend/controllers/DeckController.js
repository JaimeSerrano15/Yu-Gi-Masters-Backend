var Deck = require("../models/Deck");

module.exports.save = (req, res, next) => {
  Deck.findOne({
    name: req.body.name
  }).then(foundDeck => {
    if (foundDeck) {
      throw new Error(`Deck duplicado ${req.body.name}`);
    } else {
      let newForum = new Forum({
        name: req.body.name
      });
      newDeck.save();
      return res.json({ registed: true });
    }
  });
};

module.exports.getOne = (req, res, next) => {
  Deck.findOne({
    name: req.params.name
  })
    .then(foundDeck => {
      if (foundDeck) {
        return res.status(200).json(foundDeck);
      } else {
        return res.status(400).json(null);
      }
    })
    .catch(err => {
      next(err);
    });
};

module.exports.getAll = (req, res, next) => {
  var perPage = Number(req.query.size) || 10,
    page = req.query.page > 0 ? req.query.page : 0;

  Deck.find({})
    .limit(perPage)
    .skip(perPage * page)
    .then(decks => {
      return res.status(200).json(decks);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.update = (req, res, next) => {
  let update = {
    ...req.body
  };

  Deck.findOneAndUpdate(
    {
      name: req.params.name
    },
    update,
    {
      new: true
    }
  )
    .then(updated => {
      if (updated) return res.status(200).json(updated);
      else return res.status(400).json(null);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.delete = (req, res, next) => {
    Deck.findOneAndDelete({ name: req.params.name })
      .then(data => {
        if (data) res.status(200).json(data);
        else res.status(404).send();
      })
      .catch(err => {
        next(err);
      });
  };
  

//Se importa el modelo de la carta
var Card = require('../models/Card');

//Este modulo se encarga de guardar cartas dentro de la base de datos
module.exports.save = (req, res, next) => {
    Card.findOne({
        name: req.body.name
    })
        .then((foundCard) => {
            if (foundCard) {
                throw new Error(`Carta duplicada ${req.body.name}`);
            }
            else {
                let newCard = new Card({
                    name: req.body.name,
                    attribute: req.body.attribute,
                    stars: req.body.stars,
                    description: req.body.description,
                    type: req.body.type
                });
                newCard.save();
                res.redirect('/cards/');
            }
        })
}

//Exporta una carta en específico
module.exports.getOne = (req, res, next) => {
    Card.findOne({
        name: req.params.name
    })
        .then((foundCard) => {
            if (foundCard)
                return res.status(200).json(foundCard);
            else
                return res.status(400).json(null);
        })
        .catch(err => {
            next(err);
        })
}

//Exporta todas las cartas que están dentro de la base
module.exports.getAll = (req, res, next) => {
    Card.find({})
        .then((cards) => {
            return res.status(200).json(cards);
        }).catch(err => {
            next(err);
        })
}

//Busca una carta en específico y la borra de la base
module.exports.delete = (req, res, next) => {
    Forum.findOneAndDelete({ name: req.params.name })
        .then((data) => {
            if (data) res.status(200).json(data);
            else res.status(404).send();
        }).catch(err => {
            next(err);
        })
};
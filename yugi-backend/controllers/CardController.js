var Card = require('../models/Card');

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

module.exports.getOne = (req, res, next) => {
    Card.findOne({
        name: req.params.name
    })
        .then((foundCard) => {
            if (foundCard)
                return res.status(200).json(foundCard);
            else
                return res.redirect('/bcarta');
        })
        .catch(err => {
            console.log("NOOOOOOOOOOO")
        })
}

module.exports.getAll = (req, res, next) => {
    ///var perPage = Number(req.query.size) || 10,
    //    page = req.query.page > 0 ? req.query.page : 0;

    Card.find({})
    //    .limit(perPage)
    //    .skip(perPage * page)
        .then((cards) => {
            return res.status(200).json(cards);
        }).catch(err => {
            next(err);
        })
}

module.exports.delete = (req, res, next) => {
    Forum.findOneAndDelete({ name: req.params.name })
        .then((data) => {
            if (data) res.status(200).json(data);
            else res.status(404).send();
        }).catch(err => {
            next(err);
        })
};
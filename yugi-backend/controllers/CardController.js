var Card = require('../models/Card');

module.exports.save = (req, res, next) => {
    Card.findOne({
        name: req.body.name
    })
    .then((foundCard) =>{
        if(foundCard){
            throw new Error(`Carta duplicada ${req.body.name}`);
        }
        else{
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

module.exports.getOne = (req,res,next) =>{
    Card.findOne({
        name: req.body.name
    })
    .then((foundCard)=>{
        if(foundCard)
            return res.status(200).json(foundCard);
        else   
            return res.status(400).json(null);
    })
    .catch(err =>{
        next(err);
    })
}
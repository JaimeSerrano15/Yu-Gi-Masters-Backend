//Se exporta el modelo de los post
var Post = require('../models/Post');

//Se guarda el post dentro de la base si no encuentra otro post con el mismo nombre
module.exports.save = (req, res, next) => {
    Post.findOne({
        tittle: req.body.tittle
    }, '--content --author --comments')
        .then((foundPost) => {
            let newPost = new Post({
                tittle: req.body.tittle,
                content: req.body.content,
            });
            newPost.save();
            return res.json({ registered: true });
        })
        .catch(err=>{
            return err;
        })
};

//Busca un post dentro de la base con un nombre en específico
module.exports.getOne = (req, res, next) => {
    Post.findOne({
        tittle: req.params.tittle
    })
        .then((foundPost) => {
            if (foundPost) {
                return res.status(200).json(foundPost);
            }
            else {
                return res.status(400).json(null);
            }
        })
        .catch(err => {
            next(err);
        })
};

//Regresa el nombre de todos los post encontrados en la base
module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    Post.find({})
        .limit(perPage)
        .skip(perPage * page)
        .then((posts) => {
            return res.status(200).json(posts);
        }).catch(err => {
            next(err);
        })
};

//Busca un post en específico y procede a eliminarlo
module.exports.delete = (req,res,next)=>{
    Post.findOneAndDelete({tittle: req.params.name})
    .then((data) =>{
        if(data) res.status(200).json(data);
        else res.status(404).send();
    }).catch(err => {
        next(err);
    })
}
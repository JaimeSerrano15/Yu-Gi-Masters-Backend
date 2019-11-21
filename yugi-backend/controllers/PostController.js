var Post = require('../models/Post');

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

module.exports.delete = (req,res,next)=>{
    Post.findOneAndDelete({tittle: req.params.name})
    .then((data) =>{
        if(data) res.status(200).json(data);
        else res.status(404).send();
    }).catch(err => {
        next(err);
    })
}
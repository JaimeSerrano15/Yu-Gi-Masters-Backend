var Forum = require('../models/Forum');

module.exports.save = (req,res,next) =>{
    Forum.findOne({
        name: req.body.name
    }, '--membersNo --createdAt --posts --members --authors')
    .then((foundForum) =>{
        if(foundUser){
            throw new Error(`Foro duplicado ${req.body.name}`);
        }
        else{
            let newForum = new Forum({
                name: req.body.name
            });
            newForum.save();
            return res.json({registed: true});
        }
    })
};

module.exports.getOne = (req,res,next) =>{
    Forum.findOne({
        name: req.params.name
    })
    .then((foundForum)=>{
        if(foundForum){
            return res.status(200).json(foundForum);
        }
        else{
            return res.status(400).json(null);
        }
    })
    .catch(err =>{
        next(err);
    })
};

module.exports.getAll = (req,res,next)=>{
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;
    
    Forum.find({})
        .limit(perPage)
        .skip(perPage * page)
        .then((forums)=>{
            return res.status(200).json(forums);
        }).catch(err =>{
            next(err);
        })
};

module.exports.delete = (req,res,next)=>{
    Forum.findOneAndDelete({name: req.params.name})
    .then((data) =>{
        if(data) res.status(200).json(data);
        else res.status(404).send();
    }).catch(err => {
        next(err);
    })
};

module.exports.update = (req,res,next)=>{
    let update = {
        ...req.body
    }

    Forum.findOneAndUpdate({
        name: req.params.name
    }, update,{
        new: true
    })
    .then((updated)=>{
        if(updated)
            return res.status(200).json(updated);
        else
            return res.status(400).json(null);
    }).catch(err =>{
        next(err);
    })
};


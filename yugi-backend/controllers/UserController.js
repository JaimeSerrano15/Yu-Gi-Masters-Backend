var User = require('../models/User');
var alerta = require('alert-node');

module.exports.save = (req,res,next) =>{
    User.findOne({
        name: req.body.name
    }, '--password --email --follows')
    .then((foundUser) =>{
        if(foundUser){
            throw new Error(`Usuario duplicado ${req.body.name}`);
        }
        else{
            let newUser = new User({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
            });

            newUser.save();
            return res.json({registed: true});
        }
    })
};

module.exports.logIn = (req, res, next) => {
    User.findOne({
        name: req.body.name,
        password: req.body.password
    }, "--tyype --email")
    .then((foundUser) =>{
        if(foundUser){
            console.log("Entrasteeeeeee");
            return res.json({auth: true});
        }
        else{
            console.log("Nooooo");
            alerta('Credenciales incorrectas');
        }
    })
    .catch(err =>{
        next(err);
    });
};

module.exports.getOne = (req,res,next) =>{
    User.findOne({
        name: req.params.name
    }, '--password --email --follows')
    .then((foundUser)=>{
        if(foundUser){
            return res.status(200).json(foundUser);
        }
        else{
            return res.status(400).json(null);
        }
    })
    .catch(err =>{
        next(err);
    })
};

module.exports.getAll = (req,res,next) =>{
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;
    
    User.find({}, '--password --email')
        .limit(perPage)
        .skip(perPage * page)
        .then((users)=>{
            return res.status(200).json(users);
        }).catch(err =>{
            next(err);
        })
};




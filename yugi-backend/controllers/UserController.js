//
var User = require('../models/User');
var alerta = require('alert-node');

//Si no existe un usuario que tenga el mismo nombre que el escrito, se procede a guardar el usuario en la base
module.exports.save = (req,res,next) =>{
    User.findOne({
        name: req.body.name
    }, '--password --email --follows')
    .then((foundUser) =>{
        var userVer = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
        if(foundUser){
            throw new Error(`Usuario duplicado ${req.body.name}`);
        }
        else{
            if(userVer.test(req.body.email)){
                let newUser = new User({
                    name: req.body.name,
                    password: req.body.password,
                    email: req.body.email,
                });
    
                newUser.save();
                return res.json({registed: true});
            }
            else{
                return res.json({registed: false});
            }
        }
    })
};

//Revisa si las credenciales corresponden a un usuario. Si es así, permite al usuario ingresar a la sesión 
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
            return res.jon({auth: false});
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




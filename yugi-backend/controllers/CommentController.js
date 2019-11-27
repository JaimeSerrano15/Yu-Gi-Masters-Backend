//Importa el modelo de los comentarios
var Comment = require("../models/Comment");

//Guarda los comentarios dentro de la base
module.exports.save = (req, res, next) => {
  Comment.findOne({
    title: req.body.title
  }).then(foundComment => {
    let newComment = new Comment({
      title: req.body.title,
      content: req.body.content
    });
    newComment.save();
    return res.json({ registed: true });
  });
};

//Busca un comentario dentro de la base
module.exports.getOne = (req, res, next) => {
  Comment.findOne({
    title: req.params.title
  })
    .then(foundComment => {
      if (foundComment) {
        return res.status(200).json(foundComment);
      } else {
        return res.status(400).json(null);
      }
    })
    .catch(err => {
      next(err);
    });
};

//Muestra todos los comentarios que estén registrados
module.exports.getAll = (req, res, next) => {
  var perPage = Number(req.query.size) || 10,
    page = req.query.page > 0 ? req.query.page : 0;

  Comment.find({})
    .limit(perPage)
    .skip(perPage * page)
    .then(comments => {
      return res.status(200).json(comments);
    })
    .catch(err => {
      next(err);
    });
};

//Busca un comentario en específico y deja que este sea modificido
module.exports.update = (req, res, next) => {
  let update = {
    ...req.body
  };

  Comment.findOneAndUpdate(
    {
      title: req.params.title
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

//Busca un comentario en específico y lo borra
module.exports.delete = (req, res, next) => {
  Comment.findOneAndDelete({ title: req.params.title })
    .then(data => {
      if (data) res.status(200).json(data);
      else res.status(404).send();
    })
    .catch(err => {
      next(err);
    });
};

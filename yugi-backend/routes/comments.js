//Se crean las variables que usa el Express y la variable que toma el controlador de los comentarios
var express = require("express");
var router = express.Router();
var commentController = require("../controllers/CommentController");

//Ruta que llama al controlador que busca todos los comentarios guardados
router.get("/", commentController.getAll);

//Ruta que llama al controlador que busca un comentario en específico por medio del nombre, utilizando el método GET
router.get("/:title", commentController.getOne);

//Ruta que llama al controlador que se encarga de guardar los comentarios, utilizando el método POST
router.post("/save", commentController.save);

//Ruta que llama al controlador que busca un comentario en específico y permite modificarlo, utilizando el método PUT
router.put("/:title", commentController.update);

//Ruta que llama al controlador que busca un comentario en específico y permite eliminarlo, utilizando el método DELETE
router.delete("/:title", commentController.delete);


module.exports = router;

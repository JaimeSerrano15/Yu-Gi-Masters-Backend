var express = require("express");
var router = express.Router();
var commentController = require("../controllers/CommentController");

router.get("/", commentController.getAll);

router.get("/:title", commentController.getOne);

router.post("/save", commentController.save);

router.put("/:title", commentController.update);

router.delete("/:title", commentController.delete);

module.exports = router;

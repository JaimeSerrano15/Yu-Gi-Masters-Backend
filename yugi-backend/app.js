var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sassMiddleware = require("node-sass-middleware");
var mongoose = require("mongoose");
var cors = require('cors');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var cardsRouter = require("./routes/cards");
var commentsRouter = require("./routes/comments");
var decksRouter = require("./routes/decks");
var forumsRouter = require("./routes/forums");
var postsRouter = require("./routes/posts");

//Connect to DataBase
mongoose
  .connect(
    "mongodb+srv://GuilleTheBeast:daniel1199@cluster0-gjcyz.mongodb.net/YugiDB",
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Success Connected to DataBase");
  })
  .catch(err => {
    console.log("Errooooor" + err);
  });

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.use("/comments", commentsRouter);
app.use("/decks", decksRouter);
app.use("/forums", forumsRouter);
app.use("/posts", postsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

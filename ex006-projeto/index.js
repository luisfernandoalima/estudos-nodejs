const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const Post = require("./models/Post");

// Config
// Template engine
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  Post.findAll({ order: [["id", "DESC"]] })
    .then(function (posts) {
      res.render("home", { posts: posts });
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Erro ao buscar posts");
    });
});

app.get("/cad", function (req, res) {
  res.render("formulario");
});

app.post("/add", function (req, res) {
  Post.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
  })
    .then(function () {
      res.redirect("/");
    })
    .catch(function (err) {
      res.send(`Houve um erro! Error: ${err}`);
    });
});

app.get("/deletar/:id", function (req, res) {
  Post.destroy({ where: { id: req.params.id } }).then(function(){
    res.send("Postagem deletada com sucesso!")
  }).catch(function(){
    res.send("Postagem não encontrada")
  });
});

app.listen(8081, function () {
  console.log("O sistema está no ar");
});

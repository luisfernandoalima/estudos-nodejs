const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser")
const Sequelize = require("sequelize");

// Config
// Template engine
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set("view engine", "handlebars");

// body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Conexão com o Banco de Dados
const sequelize = new Sequelize("test", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

app.get("/cad", function (req, res) {
  res.render('formulario')
});

app.post("/add", function(req, res){
  res.send(`Título: ${req.body.titulo} Conteúdo: ${req.body.conteudo}`)
})

app.listen(8081, function () {
  console.log("O sistema está no ar");
});

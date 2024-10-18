// Carregando Módulos
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
// const mongoose = require('mongoose')

// Configurações
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
const routes = require("./routes/routes");
app.use("/", routes);

//Outros
const PORT = 8081;
app.listen(PORT, () => {
  console.log("Servidor online");
});

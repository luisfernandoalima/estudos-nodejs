// Carregando Módulos
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes/routes");
const admin = require("./routes/admin");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const usuario = require('./routes/usuario')
const passport = require('passport')
require('./config/auth')(passport)


// Configurações
app.use(
  session({
    secret: "Node",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize())
app.use(passport.session())

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error")
  res.locals.user = req.user || null
  next();
});

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
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/blogapp")
  .then(() => {
    console.log("conectado ao mongo");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", routes);
app.use("/admin", admin);
app.use('/usuarios', usuario)

//Outros
const PORT = 8081;
app.listen(PORT, () => {
  console.log("Servidor online");
});

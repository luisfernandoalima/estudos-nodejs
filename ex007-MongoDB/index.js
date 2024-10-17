const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/bancoteste")
  .then(() => {
    console.log("Conectado com sucesso");
  })
  .catch((err) => {
    console.log(err);
  });

//   Model - Usuários

//   Definindo módulos
const UsuarioSchema = mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  sobrenome: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  idade: {
    type: Number,
    require: true,
  },
});

//   Collection
mongoose.model("usuarios", UsuarioSchema);

const novoUsuario = mongoose.model('usuarios')

new novoUsuario({
    nome: "Luis",
    sobrenome: "Lima",
    email: "l@gmail.com",
    idade: 19
}).save().then(()=>{
    console.log("FOI")
}).catch((err)=>{
    console.log("Erro: " + err)
})


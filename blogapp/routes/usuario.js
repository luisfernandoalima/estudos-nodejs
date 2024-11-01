const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");
const bcrypt = require("bcryptjs");
const passport = require('passport')


router.get("/registro", (req, res) => {
  res.render("usuarios/registro");
});

router.post("/registro", (req, res) => {
  var erros = [];

  if (!req.body.nome || req.body.nome == undefined || req.body.nome == null) {
    erros.push({ texto: "Nome inválido" });
  }
  if (
    !req.body.email ||
    req.body.email == undefined ||
    req.body.email == null
  ) {
    erros.push({ texto: "E-mail inválido" });
  }
  if (
    !req.body.senha ||
    req.body.senha == undefined ||
    req.body.senha == null
  ) {
    erros.push({ texto: "Senha inválida" });
  }
  if (
    !req.body.email ||
    req.body.email == undefined ||
    req.body.email == null
  ) {
    erros.push({ texto: "Email inválido" });
  }
  if (req.body.senha != req.body.senha2) {
    erros.push({ texto: "As senhas devem ser iguais" });
  }

  if(erros.length > 0){
    res.render("usuarios/registro",{erros: erros})
  }
  else {
    Usuario.findOne({ email: req.body.email }).then((usuario) => {
      if (usuario) {
        req.flash("error_msg", "Já existe uma conta com esse e-mail");
        res.redirect("/usuarios/registro");
      } else {
        const novoUsuario = new Usuario({
          nome: req.body.nome,
          email: req.body.email,
          senha: req.body.senha,
        });
        bcrypt.genSalt(10, (erro, salt) => {
          bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
            if (erro) {
              req.flash("error.msg", "Houve um erro");
              res.redirect("/");
            }
            novoUsuario.senha = hash;
            novoUsuario
              .save()
              .then(() => {
                req.flash("success_msg", "Criado com sucesso");
                res.redirect("/");
              })
              .catch((err) => {
                console.log("ERRO");
                res.redirect("/usuarios/registro");
              });
          });
        });
      }
    });
  }
});

router.get("/login", (req, res) => {
    res.render('usuarios/login')
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/usuarios/login',
    failureFlash: true
  })(req, res, next)
})

router.get('/logout', (req, res, next)=>{
  req.logOut((err) => {
    if(err){
      return next(err)
    }
  })
  req.flash("success_msg", 'Deslogado com sucesso')
  res.redirect('/')
})

module.exports = router;

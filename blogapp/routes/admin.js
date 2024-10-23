const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categoria");
const Categoria = mongoose.model("categorias");

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/categorias", (req, res) => {
  Categoria.find().sort({date: 'desc'}).then((categorias) => {
    res.render("admin/categorias", {categorias: categorias});
  }).catch((err)=>{
    req.flash("error_msg", "Erro na listagem")
  })
});

router.get("/categorias/add", (req, res) => {
  res.render("admin/addcategorias");
});

router.post("/categorias/nova", (req, res) => {
  var erros = [];
  if (
    !req.body.nome ||
    typeof req.body.nome == undefined ||
    req.body.nome == null
  ) {
    erros.push({ text: "Nome inválido!" });
  }
  if (
    !req.body.slug ||
    typeof req.body.slug == undefined ||
    req.body.slug == null
  ) {
    erros.push({ text: "Slug inválido!" });
  }

  if (erros.length > 0) {
    res.render("admin/addcategorias", { erros: erros });
  } else {
    const novaCategoria = {
      nome: req.body.nome,
      slug: req.body.slug,
    };
    
    new Categoria(novaCategoria)
      .save()
      .then(() => {
        console.log("Categoria criada com sucesso!");
        req.flash("success_msg", "Categoria registrada com sucesso")
        res.redirect("/admin/categorias");
      })
      .catch((err) => {
        console.log(err);
        req.flash("error_msg", "Erro para salvar a categoria");
        res.redirect("/admin")
      });
  }
});

router.get('/categorias/edit/:id', (req, res)=>{
  Categoria.findOne({_id: req.params.id}).then((categoria)=> {

    res.render("admin/editcategorias", {categoria: categoria})
  }).catch((err) => {
    res.flash("error_msg", "Categoria inválida")
    res.redirect('/admin')
  })
})

router.post('/categorias/edit', (req, res) => {
  Categoria.findOne({_id: req.body.id}).then((categoria => {
    categoria.nome = req.body.nome
    categoria.slug = req.body.slug

    categoria.save().then(()=> {
      req.flash("success_msg", "Editado com sucesso")
      res.redirect("/admin/categorias")
    })
  })).catch((err)=> {
    res.redirect("/admin/categorias")
  })
})

router.post('/categorias/delet', (req, res)=>{
  Categoria.deleteOne({_id: req.body.id}).then(()=>{
    req.flash("success_msg", "Editado com sucesso")
    res.redirect('/admin/categorias/')
  })
})

module.exports = router;

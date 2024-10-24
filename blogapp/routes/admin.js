const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categoria");
const Categoria = mongoose.model("categorias");
require("../models/Postagem");
const Postagem = mongoose.model("postagem");

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/categorias", (req, res) => {
  Categoria.find()
    .sort({ date: "desc" })
    .then((categorias) => {
      res.render("admin/categorias", { categorias: categorias });
    })
    .catch((err) => {
      req.flash("error_msg", "Erro na listagem");
    });
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
        req.flash("success_msg", "Categoria registrada com sucesso");
        res.redirect("/admin/categorias");
      })
      .catch((err) => {
        console.log(err);
        req.flash("error_msg", "Erro para salvar a categoria");
        res.redirect("/admin");
      });
  }
});

router.get("/categorias/edit/:id", (req, res) => {
  Categoria.findOne({ _id: req.params.id })
    .then((categoria) => {
      res.render("admin/editcategorias", { categoria: categoria });
    })
    .catch((err) => {
      res.flash("error_msg", "Categoria inválida");
      res.redirect("/admin");
    });
});

router.post("/categorias/edit", (req, res) => {
  Categoria.findOne({ _id: req.body.id })
    .then((categoria) => {
      categoria.nome = req.body.nome;
      categoria.slug = req.body.slug;

      categoria.save().then(() => {
        req.flash("success_msg", "Editado com sucesso");
        res.redirect("/admin/categorias");
      });
    })
    .catch((err) => {
      res.redirect("/admin/categorias");
    });
});

router.post("/categorias/delet", (req, res) => {
  Categoria.deleteOne({ _id: req.body.id }).then(() => {
    req.flash("success_msg", "Editado com sucesso");
    res.redirect("/admin/categorias/");
  });
});

router.get("/postagens", (req, res) => {
  Postagem.find()
    .populate("categoria")
    .sort({ date: "desc" })
    .then((postagens) => {
      res.render("admin/postagens", { postagens: postagens });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/postagens/add", (req, res) => {
  Categoria.find()
    .then((categorias) => {
      res.render("admin/addpostagens", { categorias: categorias });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao salvar");
      res.redirect("/admin/postagens");
    });
});

router.post("/postagens/nova", (req, res) => {
  var erros = [];
  if (req.body.categoria == "0") {
    erros.push({ text: "Nenhuma Categoria registrada" });
  }

  if (erros.length > 0) {
    res.render("admin/addpostagens", { erros: erros });
  } else {
    var novaPostagem = {
      titulo: req.body.titulo,
      slug: req.body.slug,
      descricao: req.body.descricao,
      conteudo: req.body.conteudo,
      categoria: req.body.categoria,
    };

    new Postagem(novaPostagem).save().then(() => {
      req.flash("success_msg", "Postagem salva com sucesso!");
      res.redirect("/admin/postagens");
    });
  }
});

router.get("/postagens/edit/:id", (req, res) => {
  Postagem.findOne({ _id: req.params.id }).then((postagem) => {
    Categoria.find().then((categorias) => {
      res.render("admin/editpostagem", {
        postagem: postagem,
        categorias: categorias,
      });
    });
  });
});

router.post("/postagens/edit", (req, res) => {
  Postagem.findOne({ _id: req.body.id })
    .then((postagem) => {
      postagem.titulo = req.body.titulo;
      postagem.slug = req.body.slug
      postagem.descricao = req.body.descricao
      postagem.conteudo = req.body.conteudo
      postagem.categoria = req.body.categoria

      postagem.save().then(()=>{
        req.flash("success_msg", "Sucesso!")
        res.redirect("/admin/postagens")
      })
    })
    .catch((err) => {
      res.redirect("/admin/postagens");
    });
});

router.get("/postagens/delet/:id", (req, res)=>{
  Postagem.deleteOne({_id: req.params.id}).then(()=>{
    req.flash("success_msg", "Deletado com sucesso!")
    res.redirect("/admin/postagens")
  }).catch((err)=>{
    req.flash("error_msg", "Houve um erro interno")
    res.redirect("/admin/postagens")
  })
})

module.exports = router;

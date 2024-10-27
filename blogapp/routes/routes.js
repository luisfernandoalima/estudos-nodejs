const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Postagem");
const Postagem = mongoose.model("postagem");
require("../models/Categoria")
const Categoria = mongoose.model("categorias")


router.get("/", (req, res) => {
  Postagem.find()
    .populate("categoria")
    .sort({ date: "desc" })
    .then((postagem) => {
      res.render("index", { postagem: postagem });
    });
});

router.get("/postagem/:slug", (req, res) => {
  Postagem.findOne({ slug: req.params.slug }).then((postagem) => {
    if (postagem) {
      res.render("post/index", { postagem: postagem });
    } else {
      res.redirect("/");
    }
  });
});

router.get("/categorias", (req, res)=>{
    Categoria.find().then((categorias)=>{
        res.render("categorias/index", {categorias: categorias})
    })
})

router.get("/categorias/:slug", (req, res)=>{
    Categoria.findOne({slug: req.params.slug}).then((categoria)=>{
        if(categoria){
            Postagem.find({categoria: categoria._id}).then((postagem) =>{
                res.render("categorias/posts", {postagem: postagem, categoria: categoria})
            })
        }else{
            res.redirect("/")
        }
    })
})
module.exports = router;

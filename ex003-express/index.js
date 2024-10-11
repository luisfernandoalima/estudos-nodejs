const express = require("express")
const app = express()


app.get("/", function(req, res){
    res.send("Seja bem-vindo ao meu app")
    // Página incial
})

app.get("/sobre", function(req, res){
    res.send("Minha página sobre")
    // localhost:8081/sobre
})

app.get("/blog", function(req, res){
    res.send("Bem-vindo ao meu blog")
    // localhost:8081/blog
})

app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081")
})
// localhost:8081
const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

require("../models/Usuario")
const Usuario = mongoose.model('usuarios')

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email', passwordField: "senha"}, (email, senha, done) => {
        Usuario.findOne({email: email}).then((usuario) => {
            if(!usuario){
                return done(null, false, {messege:"Essa conta não existe"})
            }

            bcrypt.compare(senha, usuario.senha, (erro, bate) => {
                if(bate){
                    return done(null, usuario)
                }
                else{
                    return done(null, false, {messege:"Senha incorreta"})
                }
            })

        })
    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) =>{
        Usuario.findById(id).then((usuario) => {
            done(null, usuario)
        })
    })
}
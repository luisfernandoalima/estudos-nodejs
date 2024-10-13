const Sequelize = require('sequelize')
const sequelize = new Sequelize('sistemaDeCadastro', 'root', "", {
    host: 'localhost',
    dialect: 'mysql'
})

const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})

const Usuarios = sequelize.define('usuarios',{
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})

Usuarios.create({
    nome: 'Luis',
    sobrenome: 'fernando',
    idade: 19,
    email: 'luis@gmail.com'
})

// Postagem.create({
//     titulo: 'Olá',
//     conteudo: 'Lorem'
// })


// Postagem.sync({force: true})
// Usuarios.sync({force: true})


// sequelize.authenticate().then(function(){
//     console.log('Conectado com sucesso!')
// }).catch(function(erro){
//     console.log(`Falha ao se conectar: ${erro}`)
// })

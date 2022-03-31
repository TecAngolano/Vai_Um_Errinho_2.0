module.exports = (app) => {
    var conexao = require('../config/database')

    app.get('/', async(req, res) =>{
        conexao()
        var gallery = require('../models/gallery')
        var mygrid = require('../models/mygrid')
        var documentos = await mygrid.find().limit(6).sort({'_id':-1})
        var images = await gallery.find().limit(6)
        

        res.render('index.ejs', {dados:documentos, imagens:images})
    })
    app.post('/', (req, res) => {
        conexao()
        var modelo = require('../models/mensagem')
        var modelo = require('../models/gallery')
        var images = new modelo({
            arquivo: req.body.arquivo
        }).save()
        .then(()=>{
            res.redirect('/')
        })
        .catch(()=>{
            res.send('Não foi possivel gravar a imagem no bando de dados')
        })
        var documentos = new modelo({
            nome: req.body.first_name,
            sobrenome: req.body.last_name,
            email: req.body.email,
            mensagem: req.body.message
        })
        .save()
        .then(() =>{
            res.redirect('/')
        })
        .catch(() =>{
            res.send('Não foi possivel gravar o documento no Banco de Dados')
        })
    })
}

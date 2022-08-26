
const express = require('express');
const app = express();
const fs = require('fs')
const path = require('path')
const cors = require('cors')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')) 
app.use(cors());
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static('public'))

exports.resHTML = async (req,res,next) =>{
    try{
        res.render('index');
    }catch(err){
        next(err)
    }
}

exports.getContato = async(req,res,next) =>{

    try{
        let nome = req.query.contato
        const contatos = JSON.parse(await fs.readFileSync("models/contatos.json"))
        const index = contatos.contatos.findIndex((c) => c.nome.toLowerCase().includes(nome.toLowerCase()))
        if(index == -1){
            console.log("Contato inexistente")
            let message = 'Contato inexistente'
            res.render('erroBusca',{message: message});
            res.end();
        }else if(nome == null){
            console.log("Insira o nome a ser pesquisado")
            let message = 'Insira o nome a ser pesquisado'
            res.render('erroBusca',{message: message});
            res.end();
        }else{
            let contato = contatos.contatos.filter((c) => c.nome.toLowerCase().includes(nome.toLowerCase()));
            res.render('contatos',{contato:contato, nome:nome})
            res.end();
        }
    }catch(err){
        next(err)
    }
}

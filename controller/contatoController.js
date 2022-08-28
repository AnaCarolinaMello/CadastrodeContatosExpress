
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
        res.render('index',{message: null,mensagem:null});
    }catch(err){
        next(err)
    }
}

exports.getContato = async(req,res,next) =>{

    try{
        let nome = req.query.contato
        const contatos = JSON.parse(await fs.readFileSync("models/contatos.json"))
        const le = RegExp(`.*${nome.toLowerCase().split('').join('.*')}.*`)
        const index = contatos.contatos.findIndex((c) => c.nome.toLowerCase().match(le))
        if(index == -1){
            console.log("Contato inexistente")
            let message = 'Contato inexistente'
            res.render('index',{message: message,contato:null, nome:null,mensagem:null});
            res.end();
        }else if(nome == null){
            console.log("Insira o nome a ser pesquisado")
            let message = 'Insira o nome a ser pesquisado'
            res.render('index',{contato:null, nome:null,message: message,mensagem: null});
            res.end();
        }else{
            let contato = contatos.contatos.filter((c) => c.nome.toLowerCase().match(le));
            res.render('contatos',{contato:contato, nome:nome})
            res.end();
        }
    }catch(err){
        next(err)
    }
}

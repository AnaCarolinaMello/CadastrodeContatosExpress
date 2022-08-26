
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
        res.render('index',{
            cao: "aa"
        });
    }catch(err){
        next(err)
    }
}

exports.getContato = async(req,res,next) =>{

    try{
        let nome = req.query.contato
        const contatos = JSON.parse(await fs.readFileSync("models/contatos.json"))
        const index = contatos.contatos.findIndex(c => c.nome == nome)
        if(index == -1){
            console.log("Contato inexistente")
            res.render('index')
            res.end();
        }else if(nome == null){
            console.log("Insira o nome a ser pesquisado")
            res.render('index')
            res.end();
        }else{
            //const contatos2 = await fs.readFileSync("models/contatos.json")
            let contato = contatos.contatos.filter(c => c.nome == nome)
            //console.log(typeof(contato))
            res.render('contatos',{contato:contato})
            res.end();
        }
    }catch(err){
        next(err)
    }
}
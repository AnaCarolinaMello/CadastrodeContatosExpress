
const express = require('express');
const app = express();
const router = express.Router()
const port = 3000;
var http = require('http');
const route = require('./routes/route');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const fs = require('fs')

app.use(express.json());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/',route);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')) 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static('../public'))

app.post('/', async (req,res,next) =>{
    try{
        const nome = req.body.nome;
        const email = req.body.email;
        console.log(nome)
        const contatos = JSON.parse(await fs.readFileSync('models/contatos.json'));

        if(nome == null || email == null){
            console.log("Campos obrigatórios faltando")
            let mensagem = 'Campos obrigatórios faltando'
            res.render('index',{mensagem: mensagem,message:null});
            res.end();
        }else{

            contato = {
            id: contatos.nextId++,
            nome: nome,
            email: email
            };

            contatos.contatos.push(contato);
            await fs.writeFileSync("models/contatos.json",JSON.stringify(contatos,null,2));
            console.log("Contato adicionado com sucesso")
            res.render('index',{mensagem: "Contato adicionado com sucesso",message:null})
            res.end()
        }
    }catch(err){
        next(err)
    }


})

app.listen(port, err =>{
    console.log(`http://localhost:${port}`)
});


const express = require('express')
const app = express()
const router = express.Router()
const controller = require('../controller/contatoController')

router.get('/',controller.resHTML)
//router.post('/', controller.adicionarContato)
router.get('/Contato',controller.getContato)

module.exports = router
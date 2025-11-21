const express = require('express')
const app = express()

app.use(express.json())

let usuarios = [
    {id: 1, nome: 'João'},
    {id: 2, nome: 'Clebson'},
    {id: 3, nome: 'Maria'},
    {id: 4, nome: 'Diana'},
]

app.get('/', (req,res) => {
    res.json(usuarios)
})

app.post('/login', (req, res) => {
    const { usuario, senha } = req.body
    res.send(`Usuario: ${usuario}, Senha: ${senha}`)
})

app.post('/usuarios', (req, res) => {
    const { nome } = req.body
    const id = usuarios.length + 1

    const novoUsuario = { id, nome}
    usuarios.push(novoUsuario)

    res.status(201).json(novoUsuario)
})

app.get('/usuarios/:id', (req,res) => {
    const id = req.params.id
    res.send(`Usuário solicitado: ${id}`)
})

app.use((req, res, next) => {
    console.log('Middleware')
})

app.listen(3000, () => {
    console.log('Programação é impossivel')
})

app.use((err, req, res, next) => {
    res.status(500).json({ erro: err.message})
})

app.get('/produtos', (req,res) => {
    const { categoria, ordem} = req.query
    res.send(`Categoria: ${categoria} | Ordem: ${ordem}`)
})

app.use((err, req, res, next) => {
    console.error(err.stack)

    res.status(500).json({
        mensagem: 'Erro interno no servidor',
        erro: err.message
    })
})
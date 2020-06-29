const express = require('express');
const database = require('./database');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

server.get ('/', async function (request, response) {
    const dados = await database.read();
    return response.json(dados);
});

server.post('/', async function(request,response){

    //const {titulo, autor, genero, quantidade} = request.body;
    const titulo = request.body.titulo;
    const autor = request.body.autor;
    const genero = request.body.genero;
    const quantidade = request.body.quantidade;
    const result = await database.create (titulo, autor, genero, quantidade);
    response.status(204).send();
})

server.put('/:codigo',async function(request, response){
    const codigo = request.params.codigo;
    const quantidade = request.body.quantidade;
    const result = await database.update(codigo, quantidade);
    return response.status(200).send(); 
})

server.delete('/:codigo',async function(request,response){
    const codigo = request.params.codigo;
    const result = await database.delete(codigo);
    return response.status(200).send();
})

server.listen(process.env.PORT || 3000);
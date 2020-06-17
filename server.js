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

server.put('/:id',async function(request, response){
    const id = request.params.id;
    const comprado = request.body.comprado;
    const result = await database.update(id, comprado);
    return response.status(200).send();
})

server.delete('/:id',async function(request,response){
    const id = request.params.id;
    const result = await database.delete(id);
    return response.status(200).send();
})

server.listen(process.env.PORT || 3000);
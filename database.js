//yarn add pg 

 const Pool = require('pg').Pool;

 // 1 abre conexao
 // 2 executa comandos SQl (select,insert...)
 // 3 fechar a conexao 
 // devendo ser executado o mais rapido possivel
 const pool = new Pool({
     user:'cgguezmqtqqjmx',
     password:'f6ab53e4eba189b24f3cf8d439921def192d0eff3b8ccab94bd6b94b4e8f2095',
     host:'ec2-34-197-141-7.compute-1.amazonaws.com',
     database:'dvqdg6afg4shp',
     port:5432,
     ssl: { rejectUnauthorized: false   }
 });

 const sqlCreate = `
    CREATE TABLE IF NOT EXISTS listalivros
    (
        codigo serial primary key, 
        titulo varchar(50) not null,
        autor varchar(50) not null, 
        genero varchar(50) not null,
        quantidade int not null default 0
    )
 `;
 //comprado boolean not null default false
//comentei o comando de criar tabela, uma vez que as tabelas devem ser criadas uma unica vez.
 /*pool.query(sqlCreate, function(error, result) {
     if (error)
        throw error

    console.log('Tabela criada com sucesso!');
 });*/

 module.exports = {

 async create (titulo, autor, genero, quantidade) {
    const sql = ` INSERT INTO listalivros (titulo, autor, genero, quantidade)
                        VALUES ($1, $2, $3, $4)`;

    const result = await pool.query(sql, [titulo, autor, genero, quantidade]);
    return result.rowCount;
 },

 //create();

async read() {
    const sql = 'SELECT * FROM listalivros order by codigo'
    const result = await pool.query(sql);
    return result.rows;
},
async update(codigo, quantidade$){
    const sql = `UPDATE listalivros SET quantidade = $1 WHERE codigo = $2`;
    const result = await pool.query(sql,[quantidade,codigo]);
    return result.rowCount;
},
async delete(codigo){
    const sql = `DELETE FROM listalivros WHERE codigo = $1`;
    result = await pool.query(sql,[codigo]);
    return result.rowCount;
},
}

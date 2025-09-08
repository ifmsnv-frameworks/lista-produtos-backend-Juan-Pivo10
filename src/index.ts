import express from 'express'
import mysql from 'mysql2/promise'
import 'dotenv/config'

const app = express()
app.get('/', async(req, res) => {
     if(process.env.DBHOST === undefined){
           res.status(500).send('DBHOST não esta definido nas variaveis de ambiente')
            return
        }
        if(process.env.DBUSER === undefined){
           res.status(500).send('DBUSER não esta definido nas variaveis de ambiente')
            return
        }
        if(process.env.DBPASSWORD === undefined){
           res.status(500).send('DBPASSWORD não esta definido nas variaveis de ambiente')
            return
        }
        if(process.env.DBDATABASE === undefined){
           res.status(500).send('DBDATABASE não esta definido nas variaveis de ambiente')
            return
        }
        if(process.env.DBPORT === undefined){
           res.status(500).send('DBPORT não esta definido nas variaveis de ambiente')
            return
        }
         try{
const conn = await mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBDATABASE,
        port: Number(process.env.DBPORT)
    })
    res.send("Conectado ao banco!")
}
     catch (err) {
        if (err instanceof Error === false) {
            res.status(500).send('Erro desconhecido ao conectar ao banco de dados')
            return
        }
        const error = err as Error
            res.status(500).send('Erro ao conectar ao banco de dados: ' + error.message)
         }
})
app.get('/produtos', async(req, res) => {
    if(process.env.DBHOST === undefined){
           res.status(500).send('DBHOST não esta definido nas variaveis de ambiente')
            return
        }
        if(process.env.DBUSER === undefined){
           res.status(500).send('DBUSER não esta definido nas variaveis de ambiente')
            return
        }
        if(process.env.DBPASSWORD === undefined){
           res.status(500).send('DBPASSWORD não esta definido nas variaveis de ambiente')
            return
        }
        if(process.env.DBDATABASE === undefined){
           res.status(500).send('DBDATABASE não esta definido nas variaveis de ambiente')
            return
        }
        if(process.env.DBPORT === undefined){
           res.status(500).send('DBPORT não esta definido nas variaveis de ambiente')
            return
        }
    try {
        const conn = await mysql.createConnection({
            host: process.env.DBHOST,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DBDATABASE,
            port: Number(process.env.DBPORT)
        })

        const [rows] = await conn.query('SELECT * FROM produtos')
        res.json(rows)
    } catch (err) {
        if (err instanceof Error === false) {
            res.status(500).send('Erro desconhecido ao conectar ao banco de dados')
            return
        }
        const error = err as Error
        res.status(500).send('Erro ao conectar ao banco de dados: ' + error.message)
    }
})
app.listen(8000, () => {
    console.log('Server is running on port 8000')
})
/*use defaultdb;
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    urlfoto VARCHAR(255) NOT NULL,
    descricao TEXT
);

INSERT INTO produtos (nome, preco, urlfoto, descricao) VALUES
('Nescau', 12, 'https://img.cdndsgni.com/preview/10001741.jpg', 'Para tomar de manhã, a tarde e a noite.'),
('Passatempo', 8, 'https://img.cdndsgni.com/preview/10001708.jpg', 'Rápido e prático.'),
('Sucrilhos', 15, 'https://http2.mlstatic.com/D_721631-MLB85003273332_052025-C.jpg', 'Muita substância.');*/
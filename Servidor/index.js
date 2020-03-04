console.log('port',process.env.S_PORT,'host',process.env.DB_HOST)
const dotenv = require('dotenv')
dotenv.config()
console.log(process.env)
console.log('port',process.env.S_PORT,'host',process.env.DB_HOST)
//crear servidor
const express = require('express')
const cors = require('cors')
const mysql = require('mysql')


const app = express()


const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})
conexion.connect(err => {
    if(err) {
        return err;
    }
})

app.use(cors())
app.get('/', (req, res) => {
    const SELECCIONAR_TAREAS = 'SELECT * FROM tareas';
    conexion.query(SELECCIONAR_TAREAS, (err, result) =>{
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: result,
            })
        }
    })
})
app.get('/llenar', (req, res) =>{
    const {titulo} = req.query
    const LLENAR_LISTA = `INSERT INTO tareas (titulo) VALUES ('${titulo}')`
    conexion.query(LLENAR_LISTA), (err, result) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send("Te has propuesto una nueva tarea")
        }
    }
})
app.get('/completadas', (req, res) => {
    const SELECCIONAR_COMPLETADAS = 'SELECT * FROM tareas_completadas';
    conexion.query(SELECCIONAR_COMPLETADAS, (err, result) => {
        if(err){
            return res.send(err)
        } else {
            return res.json({
                data: result,
            })
        }
    })
})
app.listen(process.env.S_PORT, () => {
    console.log('Server listening on port',process.env.S_PORT,'host',process.env.DB_HOST)
})


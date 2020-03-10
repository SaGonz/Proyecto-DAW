
const dotenv = require('dotenv')
dotenv.config()

//crear servidor
const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

//El objeto Express representa la aplicación
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
console.log('respuesta')

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

const lista = [
    { id: 0, titulo: "Hacer el proyecto"},
    { id: 1, titulo: "Hacer té"},
    { id: 2, titulo: "Hacer el proyecto"},
]
//Leyendo una tarea en particular
app.get('/listafalsa', (req, res) =>{
    res.send(lista)
})
//Leyendo una tarea en particular
app.get('/listafalsa/:id', (req, res) =>{
    let item = lista.find(i => parseInt(i.id === req.params.id))
    if(!item) res.status(404).send('No se ha encontrado la tarea')
    res.send(item,"Aquí sí")
})
app.listen(process.env.S_PORT, () => {
    console.log('Server listening on port',process.env.S_PORT,'host',process.env.DB_HOST)
})


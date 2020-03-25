
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
    const SELECCIONAR_TAREAS = `SELECT * FROM tarea WHERE id_estado="en proceso"`
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

//POST
app.get('/llenar', (req, res) =>{
    const {titulo} = req.query
    const LLENAR_LISTA = `INSERT INTO tarea (titulo,id_estado) VALUES ('${titulo}',"en proceso")`
    conexion.query(LLENAR_LISTA), (err, result) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send("Te has propuesto una nueva tarea")
        }
    }
})

//POST para completadas
app.get('/completar', (req, res) => {
    const {id_tareas} = req.query
    const COMPLETAR_TAREA = `UPDATE tarea SET id_estado="completo" WHERE id_tareas = ${id_tareas}`
    conexion.query(COMPLETAR_TAREA, (err, result) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send("Has terminado una tarea")
        }
    })
})

//DELETE
app.get('/borrar', (req, res) => {

    const {id_tareas} = req.query
    const BORRAR_TAREA = `DELETE FROM tarea WHERE id_tareas = ${id_tareas}`
    conexion.query(BORRAR_TAREA), (err, result) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send("Has borrado una tarea")
        }
    }
})

app.listen(process.env.S_PORT, () => {
    console.log('Server listening on port',process.env.S_PORT,'host',process.env.DB_HOST)
})


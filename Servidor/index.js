const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
//Para guardar secretos
const dotenv = require('dotenv')
dotenv.config()
//crear servidor
const express = require('express')
//Para hacer log de las peticiones del servidor
const morgan = require('morgan')
const helmet = require('helmet')
const config = require('config')
const cors = require('cors')
const mysql = require('mysql')
const path = require('path');

//El objeto Express representa la aplicación
const app = express()
app.use(cors())
app.use(helmet())

//Serve React
//app.use(express.static(path.join(__dirname, 'build')));

//Configuración
console.log('Nombre de la aplicación: '+config.get('name'))

if(app.get('env') === 'development') {
    app.use(morgan('dev'))
    startupDebugger('morgan activado')
}
dbDebugger('conectado a la Base de Datos, debuggeando')

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

conexion.connect(err => {
    if(err) {
        return err;
    } else {
        console.log('conexion correcta a bbdd')
    }
})


/*app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });*/

app.get('/api/tareas', (req, res, next) => {
    const id_estado = "en proceso"
    const SELECCIONAR_TAREAS = 
    `SELECT * FROM tarea WHERE id_estado = ${conexion.escape(id_estado)};`
    
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

//Ruta para ver las tareas completadas
app.get('/api/completadas', (req,res) => {
    const id_estado = "completada"
    const SELECCIONAR_TAREAS_COMPLETADAS = 
    `SELECT * FROM tarea WHERE id_estado = ${conexion.escape(id_estado)};`
    
    conexion.query(SELECCIONAR_TAREAS_COMPLETADAS, (err, result) =>{
        if(err) {
            res.send(err)
        } else {
            return res.json({
                data: result
            })
        }
    })
})

app.get('/llenar', (req, res) =>{
    const {titulo,id_categoria} = req.query
    const id_estado = "en proceso"
    const LLENAR_LISTA = 
    `INSERT INTO tarea (titulo,id_estado,id_categoria,fecha_creacion) 
    VALUES (${conexion.escape(titulo)}, ${conexion.escape(id_estado)}, ${conexion.escape(id_categoria)},NOW());`
     
    conexion.query(LLENAR_LISTA), (err, result) => {
        if(err) {
            console.log(`--------${err}-----`)
            return res.send(err)
        } else {
            return res.send("Te has propuesto una nueva tarea")
        }
    }
})
app.get('/completar', (req, res) => {
    const {id_tarea} = req.query
    const id_estado = "completada"

    const COMPLETAR_TAREA = 
    `UPDATE tarea SET id_estado= ${conexion.escape(id_estado)},fecha_finalizacion=NOW() 
    WHERE id_tarea = ${conexion.escape(id_tarea)}`

    conexion.query(COMPLETAR_TAREA, (err, result) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send()
        }
    })
})
app.get('/borrar', (req, res, next) => {
    const {id_tarea} = req.query
    const BORRAR_TAREA = `DELETE FROM tarea WHERE id_tarea = ${conexion.escape(id_tarea)}`
    conexion.query(BORRAR_TAREA), (err, result) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send("Has borrado una tarea")
        }
    }
    next();
})

app.listen(process.env.S_PORT, () => {
    console.log('Server listening on port',process.env.S_PORT,'host',process.env.DB_HOST)
})


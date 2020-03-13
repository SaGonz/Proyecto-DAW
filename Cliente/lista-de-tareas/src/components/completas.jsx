import React, { Component } from 'react'

class Completas extends Component {

    state = { 
        tareas: [],
        id_tarea: null,
        titulo: null,
        fecha_creacion: null,
        fecha_finalizacion: null
    }

    render() { 
        return ( 
            <div>
                <h1>Aquí van las tareas completadas</h1>
            </div>
        )
    }
}
 
export default Completas 
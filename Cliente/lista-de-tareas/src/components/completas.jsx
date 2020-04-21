import React, { Component } from 'react'
import 'moment-timezone';

class Completas extends Component {

    state = { 
        tareas: [],
        id_tarea: null,
        titulo: null,
        fecha_creacion: null,
        fecha_finalizacion: null
    }

    componentDidMount() {
        this.getTareasCompletadas()
    }
    getTareasCompletadas = _ => {
        fetch(`http://`+process.env.REACT_APP_HOST+`:`+process.env.REACT_APP_SERVER_PORT+`/api/completadas`)
        .then(respuesta => respuesta.json())
        .then(respuesta => this.setState({tareas: respuesta.data}))
        .catch(err => console.log(err))
        console.log('getTareasCompletadas',this.state.tareas)
    }

    renderTareas = () => { 
        return this.state.tareas.map(
            ({id_tareas, titulo, fecha_creacion, fecha_finalizacion}) => 
            <label className="tarea" key={id_tareas}>
            {titulo}
            (? días)
            </label>
        )
    }
    render() { 
        return ( 
            <div className="tareas-container">
                {this.state.tareas.length === 0 && <div className="tarea"> Aún no completaste ninguna tarea</div>}
                {this.renderTareas()}
            </div>
        )
    }
}
 
export default Completas 
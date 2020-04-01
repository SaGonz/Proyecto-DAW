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
        fetch(`http://`+process.env.REACT_APP_HOST+`:`+process.env.REACT_APP_SERVER_PORT+`/r-completadas`)
        .then(respuesta => respuesta.json())
        .then(respuesta => this.setState({tareas: respuesta.data}))
        .catch(err => console.log(err))
        console.log('getTareasCompletadas',this.state.tareas)
    }

    handleClick = _ => {
        console.log('click a completadas')
    }

    renderTareas = () => { 
        return this.state.tareas.map(({id_tareas, titulo, fecha_creacion, fecha_finalizacion}) => 
        <div className="tarea" key={id_tareas}>{titulo} ({fecha_creacion.diff(fecha_finalizacion,'days',true)} días)</div>)
    }
    render() { 
        return ( 
            <div>
                {this.state.tareas.length === 0 && 'Aún no completaste ninguna tarea'}
                {this.renderTareas()}
            </div>
        )
    }
}
 
export default Completas 
import React, { Component } from 'react'
import 'moment-timezone';
import moment from 'moment-timezone';

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
        fetch(`http://`+process.env.REACT_APP_HOST_AND_PORT+`/api/completadas`)
        .then(respuesta => respuesta.json())
        .then(respuesta => this.setState({tareas: respuesta.data}))
        .catch(err => console.log(err))
        console.log('getTareasCompletadas',this.state.tareas)
    }
    getTiempoTranscurrido = (inicio, fin) => {
        let finicio = moment(inicio)
        let ffin = moment(fin)
        let tiempo = ''

        ffin.diff(finicio, 'minutes') > 59 ?
            (ffin.diff(finicio, 'hours') > 24 
                ? tiempo = ffin.diff(finicio, 'days') + " días" 
                : tiempo = ffin.diff(finicio, 'hours') + " horas"
            )
        : tiempo = ffin.diff(finicio, 'minutes') + " minutos"
        
        return tiempo
    }

    renderTareas = () => { 
        return this.state.tareas.map(
            ({id_tarea, titulo, fecha_creacion, fecha_finalizacion}) => 
            <label className="tarea completada" key={id_tarea}>
            {titulo}
            <button className="fecha">({this.getTiempoTranscurrido(fecha_creacion,fecha_finalizacion)})</button>
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
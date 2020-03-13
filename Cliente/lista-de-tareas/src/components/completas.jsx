import React, { Component } from 'react'

class Completas extends Component {

    state = { 
        tareas: [],
        id_tarea: null,
        titulo: null,
        fecha_creacion: null,
        fecha_finalizacion: null
    }

    getTareasCompletas = _ => {
        fetch(`http://`+process.env.REACT_APP_HOST+`:`+process.env.REACT_APP_SERVER_PORT+`/completas`)
        .then(respuesta => respuesta.json())
        .then(respuesta => this.setState({tareas: respuesta.data}))
        .catch(err => console.log(err))
        console.log('getTareasCompletas')
    }

    renderTareas = () => { 
        return this.state.tareas.map(({id_tareas, titulo}) => <div className="tarea" key={id_tareas}>{titulo}</div>)
    }
    render() { 
        return ( 
            <div>
                {this.state.tareas.length === 0 && ''}
                {this.renderTareas()}
            </div>
        )
    }
}
 
export default Completas 
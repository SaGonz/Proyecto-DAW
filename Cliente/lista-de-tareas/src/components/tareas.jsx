import React, { Component } from 'react'

class Tareas extends Component {
    constructor(props){
        super(props)
        this.state = {
            tareas: [],
            id_tarea: null,
            titulo: null,
            fecha_creacion: null,
            fecha_finalizacion: null,
            urgencia: '',
        }
    }
    
    renderTareas = ({id_tareas, titulo}) => <li className="tarea" key={id_tareas}>{titulo}</li>
    render() { 
        return ( 
            <div>
                <img src={this.state.imagen} alt=''/>
                {this.props.listaDeTareas.map(this.renderTareas)}
            </div>
        )
    }
}
 
export default Tareas 
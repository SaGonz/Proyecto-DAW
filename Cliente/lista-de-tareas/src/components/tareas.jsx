import React, { Component } from 'react'
import Formulario from './formulario'
import Completas from './completas'

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

    renderTareas = () => { 
        return this.props.listaDeTareas.map(({id_tareas, titulo}) => <div className="tarea" key={id_tareas}>{titulo}</div>)
    }
    render() { 
        return ( 
            <div>
                <Formulario listaDeTareas={this.props.listaDeTareas} obtenerTareas={this.props.obtenerTareas}/>
                {this.props.listaDeTareas.length === 0 && "Márcate un propósito"}
                {this.renderTareas()}
                <Completas/>
            </div>
        )
    }
}
 
export default Tareas 
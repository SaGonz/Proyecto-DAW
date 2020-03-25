import React, { Component } from 'react'
import Formulario from './formulario'
import Completas from './completas'
import BotonBorrar from './botonborrar'
import BotonCompletar from './botoncompletar'

class Tareas extends Component {
    constructor(props){
        super(props)
    }

    renderTareas = () => { 
        return this.props.listaDeTareas.map(({id_tareas, titulo}) => <div className="tarea" key={id_tareas}> <BotonCompletar idTarea={id_tareas}/> {titulo} <BotonBorrar idTarea={id_tareas}/></div>)
    }
    render() { 
        return ( 
            <div>
                <Formulario listaDeTareas={this.props.listaDeTareas} obtenerTareas={this.props.obtenerTareas}/>
                {this.props.listaDeTareas.length === 0 && <div className="tarea">Márcate un propósito</div>}
                {this.renderTareas()}
            </div>
        )
    }
}
 
export default Tareas 
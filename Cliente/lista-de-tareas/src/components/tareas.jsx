import React, { Component } from 'react'
import Formulario from './formulario'
import BotonBorrar from './botonborrar'
import BotonCompletar from './botoncompletar'
import Moment from 'react-moment';
import 'moment-timezone';

class Tareas extends Component {

    renderTareas = () => { 
        return this.props.listaDeTareas.map(
            ({id_tarea, titulo, fecha_creacion, id_estado}) => 
            <div className="tarea" key={id_tarea}> 
                <BotonCompletar idTarea={id_tarea}/> 
                {titulo} estado:{id_estado}
                <button className="fecha">
                    <Moment format='DD-MM-YY LT'>{fecha_creacion}</Moment>
                </button>
                <BotonBorrar idTarea={id_tarea}/>
            </div>
        )
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
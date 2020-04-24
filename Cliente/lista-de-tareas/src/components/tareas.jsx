import React, { Component } from 'react'
import Formulario from './formulario'
import BotonBorrar from './botonborrar'
import BotonCompletar from './botoncompletar'
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment-timezone';

class Tareas extends Component {

    renderTareas = () => { 
        return this.props.listaDeTareas.map(
            ({id_tarea, titulo, id_categoria, fecha_creacion}) => 
            <label className="tarea" key={id_tarea}> 
                <BotonCompletar idTarea={id_tarea} actualizarRoot={this.props.actualizarRoot}/> 
                {titulo} 
                <button className="fecha">{id_categoria}</button>
                <button className="fecha">
                    <Moment format='DD-MM-YY LT'>{fecha_creacion}</Moment>
                </button>
                <BotonBorrar idTarea={id_tarea} actualizarRoot={this.props.actualizarRoot}/>
            </label>
        )
    }
    render() { 
        return ( 
            <div>
                <Formulario listaDeTareas={this.props.listaDeTareas} obtenerTareas={this.props.obtenerTareas}/>
                <div className="tareas-container">
                {this.props.listaDeTareas.length === 0 && <div className="tarea">Márcate un propósito</div>}
                {this.renderTareas()}
                </div>
                <button onClick={this.groupTareas}>tareas nuevas</button>
            </div>
        )
    }
}
 
export default Tareas 
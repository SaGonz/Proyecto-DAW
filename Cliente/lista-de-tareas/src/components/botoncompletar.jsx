import React, { Component } from 'react';
import useSound from 'use-sound';

class BotonCompletar extends Component {

    handleClick = () => {
        fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_SERVER_PORT}/completar?id_tarea=${this.props.idTarea}`)
        .then(this.callbackPadre)        
    }
    callbackPadre = () => {
        this.props.actualizarRoot()
    }

    render() {
        return (
            <input className="boton-completar" type="checkbox" 
            onClick={this.handleClick} onChange={this.handleChange}/>
        )
    }
}

export default BotonCompletar;
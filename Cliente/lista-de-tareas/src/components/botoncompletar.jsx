import React, { Component } from 'react';
import useSound from 'use-sound';

class BotonCompletar extends Component {

    handleClick = () => {
        console.log("has decidido completar una tarea",this.props.idTarea)
        fetch(`http://`+process.env.REACT_APP_HOST+`:`+process.env.REACT_APP_SERVER_PORT+`/completar?id_tarea=${this.props.idTarea}`)
        .then(this.callbackPadre)
        console.log('has mandado la petición')
        
    }
    handleChange = () => {

    }

    callbackPadre = () => {
        this.props.actualizarRoot()
    }

    render() {
        return (
            <input className="boton-completar" type="checkbox" onClick={this.handleClick} onChange={this.handleChange}/>
        )
    }
}

export default BotonCompletar;
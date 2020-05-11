import React, { Component } from 'react';
import useSound from 'use-sound';
//import completado from './../sounds/256112__nckn__pleasant-done-notification.mp3'

//const [playOn] = useSound( './../sounds/256112__nckn__pleasant-done-notification.mp3')
    
class BotonCompletar extends Component {
    
    
    handleClick = () => {
        fetch(`http://${process.env.REACT_APP_HOST_AND_PORT}/completar?id_tarea=${this.props.idTarea}`)
        .then(this.callbackPadre)
        
        useSound('./../sounds/256112__nckn__pleasant-done-notification.mp3')
    }
    callbackPadre = () => {
        this.props.refreshDataFromServer()
    }

    render() {
        return (
            <input className="boton-completar" type="checkbox" 
            onClick={this.handleClick} onChange={this.handleChange}/>
        )
    }
}

export default BotonCompletar;
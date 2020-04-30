import React, { Component } from 'react'

class BotonBorrar extends Component {

    handleBorrar = (e) => {
        this.borrarTarea(this.props.idTarea)
    }
    borrarTarea = (idBorrar) => {
        fetch(`http://`+process.env.REACT_APP_HOST+`:`+process.env.REACT_APP_SERVER_PORT+`/borrar?id_tarea=${idBorrar}`)
        .then(this.callbackPadre)
        .catch(err => console.log(err))
    }
    callbackPadre = _ => {
        this.props.actualizarRoot()
    }

    render() {
        return(
            <button className="boton-borrar" onClick={this.handleBorrar}>x</button>
        )
    }
}

export default BotonBorrar;
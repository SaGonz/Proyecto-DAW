import React, { Component } from 'react'

class BotonBorrar extends Component {

    handleBorrar = (e) => {
        console.log('quieres borrar desde cliente', this.props.idTarea)
        this.borrarTarea(this.props.idTarea)
    }
    borrarTarea = (idBorrar) => {
        console.log('borrartareapeticion hit',idBorrar)
        fetch(`http://`+process.env.REACT_APP_HOST+`:`+process.env.REACT_APP_SERVER_PORT+`/borrar?id_tareas=${idBorrar}`)
    }

    render() {
        return(
            <a className="boton-borrar" onClick={this.handleBorrar}>x</a>
        )
    }
}

export default BotonBorrar;
import React, { Component } from 'react'

class BotonBorrar extends Component {

    handleBorrar = (e) => {
        console.log('quieres borrar desde cliente', this.props.idTarea)
        this.borrarTarea(this.props.idTarea)
    }
    borrarTarea = (idBorrar) => {
        console.log('borrartareapeticion hit',idBorrar)
        fetch(`http://`+process.env.REACT_APP_HOST+`:`+process.env.REACT_APP_SERVER_PORT+`/borrar?id_tarea=${idBorrar}`)
    }

    render() {
        return(
            <button className="boton-borrar" onClick={this.handleBorrar}>x</button>
        )
    }
}

export default BotonBorrar;
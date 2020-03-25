import React, { Component } from 'react';

class BotonCompletar extends Component {

    handleClick = () => {
        console.log("has decidido completar una tarea",this.props.idTarea1)
        fetch(`http://`+process.env.REACT_APP_HOST+`:`+process.env.REACT_APP_SERVER_PORT+
        `/completar?id_tareas=${this.props.idTarea}`)
    }

    render() {
        return (
            <input className="boton-completar" type="checkbox" onClick={this.handleClick}/>
        )
    }
}

export default BotonCompletar;
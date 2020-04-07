import React, { Component } from 'react'

class Formulario extends Component{
    constructor(props) {
        super(props)
        this.state = {valor: '', fecha_creacion: ''}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({valor: event.target.value})
        console.log(event.target.value)
    }
    handleSubmit(event) {
        event.preventDefault()
        console.log('enviar')
        this.addTarea()
    }

    addTarea = _ => {
        fetch(`http://`+process.env.REACT_APP_HOST+`:`+process.env.REACT_APP_SERVER_PORT+`/llenar?titulo=${this.state.valor}`)
        .then(this.props.obtenerTareas())
        .catch(err => console.error(err))
        console.log('tarea enviada')
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.valor} onChange={this.handleChange}/>
                <input type="submit" className="boton-envio" value="Iniciar"/>
            </form>
        )
    }
}

export default Formulario
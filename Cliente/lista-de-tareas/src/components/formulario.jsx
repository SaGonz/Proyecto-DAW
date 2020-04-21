import React, { Component } from 'react'

class Formulario extends Component{
    constructor(props) {
        super(props)
        this.state = {
            valor: '', 
            fecha_creacion: '',
            errores: {
                longitud: ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick(event) {
        event.target.value = ''
        console.log(event.target.value)
    }
    handleChange(event) {
        event.preventDefault()
        let errores = this.state.errores
        
        errores.longitud = event.target.value.length < 45 
            ? "El título de tu tarea es demasiado largo."
            : ''

        if(event.target.value.length < 45) {
            this.setState({valor: event.target.value})  
        } else {
            console.log("tarea demasado larga")
            this.handleError()
        }
        
        console.log(event.target.value)
    }
    handleSubmit(event) {
        event.preventDefault()
        console.log('enviar')
        this.addTarea()
    }
    handleError() {
        alert('tarea demasiado larga',this.state.errores.longitud)
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
                <input type="text" value={this.state.valor} onChange={this.handleChange} onClick={this.handleClick}/>
                <input type="submit" className="boton-envio" value="Iniciar"/>
            </form>
        )
    }
}

export default Formulario
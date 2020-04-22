import React, { Component } from 'react'

class Formulario extends Component{
    constructor(props) {
        super(props)
        this.state = {
            valor: '', 
            fecha_creacion: '',
            errores: {
                vacio: '',
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

        if(event.target.value.length > 1) {
            this.setState({errores: {vacio: 'El campo de tareas no debe estar vacío.'}})
        }

        if(event.target.value.length < 45) {
            this.setState({errores: {longitud: ''}})
            this.setState({valor: event.target.value})  
        } else {
            this.setState({errores: {longitud: 'El título de tu tarea es demasiado largo.'}})
        }
    }
    handleSubmit(event) {
        event.preventDefault()
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
                <input type="text" value={this.state.valor} onChange={this.handleChange} onClick={this.handleClick}/>
                <input type="submit" className="boton-envio" value="Iniciar"/>
                <div className="error">{this.state.errores.longitud}</div>
                <div className="error">{this.state.errores.vacio}</div>
            </form>
        )
    }
}

export default Formulario
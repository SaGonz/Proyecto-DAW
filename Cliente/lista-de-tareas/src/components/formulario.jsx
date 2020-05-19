import React, { Component } from 'react'

class Formulario extends Component{
    constructor(props) {
        super(props)
        this.state = {
            valor: '', 
            fecha_creacion: '',
            categoria: 'urgente importante',
            error: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick(event) {
        event.target.value = ''
    }
    handleChange(event) {
        event.preventDefault()

        const {value} = event.target
        if(value.length < 45) {
            this.setState({error: ''})
            this.setState({valor: event.target.value})  
        } else {
            this.setState({error: 'El título de tu tarea es demasiado largo.'})
            
        }
    }
    handleSubmit(event) {
        event.preventDefault()
        this.addTarea()
    }

    handleChoice = (event) => {
        const {value} = event.target
        console.log('value,',value)
        let urgencia = ''

        switch(value) {
            case 'ui':
                    urgencia = 'urgente importante'
                break;
            case 'uni':
                    urgencia = 'urgente no importante'
                break;
            case 'nui':
                    urgencia = 'no urgente importante'
                break;
            case 'nuni':
                    urgencia = 'no urgente no importante'
                break;
            default:
                    urgencia = 'urgente importante'
                break;
        }

        this.setState({categoria: urgencia})
    }

    addTarea = _ => {
        const categoria = this.state.categoria
        fetch(`http://${process.env.REACT_APP_HOST_AND_PORT}/llenar?titulo=${this.state.valor}&id_categoria=${categoria}`)
        .then(this.props.obtenerTareas())
        .catch(err => console.error(err))
        console.log('tarea enviada')
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" pattern="\/\:\&\'\$\=" value={this.state.valor} onChange={this.handleChange} onClick={this.handleClick}/>
                <select id="categoria" name="urgencia" onClick={this.handleChoice} className="dropdown">
                    <option value="ui" defaultValue>urgente importante</option>
                    <option value="uni">urgente no importante</option>
                    <option value="nui">no urgente importante</option>
                    <option value="nuni">no urgente no importante</option>
                </select>
                <input type="submit" className="boton-envio" value="Iniciar"/>
                <div className="error">{this.state.error}</div>
            </form>
        )
    }
}

export default Formulario
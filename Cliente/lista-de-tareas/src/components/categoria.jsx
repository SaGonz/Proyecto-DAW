import React, { Component } from 'react'
import 'moment-timezone';

class Categoria extends Component {

    verProps = () => {
        console.log('las props de Categoria:',this.props.ordenadas)
    }

    sacarCategoria = () => {

        for (let [key,value] of Object.entries(this.props.ordenadas)) {
            console.log('categoria por cada',key,value)
             React.createElement(`div`, null, `${key}`)
        }
    }

    sacarHijos = () => {

    }

    render () {
        return (
            <div>a
                <div>{this.sacarCategoria()}</div>
                <li>tarea</li>
            </div>
        )
    }

}

export default Categoria
import React, { Component } from 'react'
import Formulario from './formulario'
import { ItemTarea } from './itemtarea'
import 'moment-timezone';

class Tareas extends Component {

    findCategories = (lista) => {
        const uniqueCategories = new Set()
        lista.forEach(item => {
            uniqueCategories.add(item.id_categoria)
        })
        return uniqueCategories
    }

    orderTasksByCategory = (tasks) => {
        const categories = this.findCategories(tasks)
        const sortedByCategory = {}
        for (const category of categories) {
            sortedByCategory[category] = tasks.filter(task => task.id_categoria === category)
        }
        return sortedByCategory
    }

    renderTareas = () => { 
        console.log(this.orderTasksByCategory(this.props.listaDeTareas))
        
        return this.props.listaDeTareas.map(
            (item) => 
            <ItemTarea { ...item } refreshDataFromServer={this.props.refreshDataFromServer}/>
        )
    }
    render() { 
        return ( 
            <div>
                <Formulario listaDeTareas={this.props.listaDeTareas} obtenerTareas={this.props.obtenerTareas}/>
                <div className="tareas-container">
                {this.props.listaDeTareas.length === 0 && <div className="tarea">Márcate un propósito</div>}
                {this.renderTareas()}
                </div>
            </div>
        )
    }
}
 
export default Tareas 
import React, { Component } from 'react'
import Formulario from './formulario'
import { ItemTarea } from './itemtarea'
import 'moment-timezone';
import Categoria from './categoria';

class Tareas extends Component {

    encontrarCategorias = (lista) => {
        const unicasCategorias = new Set()
        lista.forEach(item => {
            unicasCategorias.add(item.id_categoria)
        })
        return unicasCategorias
    }

    ordenarPorCategoria = (tareas) => {
        const categorias = this.encontrarCategorias(tareas)
        const ordenadasPorCategoria = {}
        for (const categoria of categorias) {
            ordenadasPorCategoria[categoria] = tareas.filter(tarea => tarea.id_categoria === categoria)
        }
        return ordenadasPorCategoria
    }
    mostrarPorCategoria = (tareasOrdenadas) => {
        console.log('mostrando por categoria')
        for (let [key,value] of Object.entries(tareasOrdenadas)) {
            console.log(key,value)
        }
    }
    renderTareas = () => { 
  
        this.mostrarPorCategoria(this.ordenarPorCategoria(this.props.listaDeTareas))

        return this.props.listaDeTareas.map(
            (item) => 
            <ItemTarea { ...item } refrescarInfoServidor={this.props.refrescarInfoServidor}/>
        )
    }
    render() { 
        return ( 
            <div>
                <Formulario listaDeTareas={this.props.listaDeTareas} obtenerTareas={this.props.obtenerTareas}/>
                {/* <Categoria ordenadas={this.ordenarPorCategoria(this.props.listaDeTareas)}/> */}
                <div className="tareas-container">
                {this.props.listaDeTareas.length === 0 && <div className="tarea">Márcate un propósito</div>}
                {this.renderTareas()}
                </div>
            </div>
        )
    }
}
 
export default Tareas 
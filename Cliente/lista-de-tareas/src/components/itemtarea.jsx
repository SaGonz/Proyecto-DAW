import React from 'react'
import BotonBorrar from './botonborrar'
import BotonCompletar from './botoncompletar'
import moment from 'moment'

export const ItemTarea = ({ id_tarea, titulo, id_categoria, fecha_creacion, refrescarInfoServidor }) => {
    const fechaFormateada = moment(fecha_creacion).format('DD-MM-YY LT')

    console.log('item tarea: titulo: ',titulo)
    return  <label className="tarea" key={id_tarea}> 
                <BotonCompletar idTarea={id_tarea} refrescarInfoServidor={refrescarInfoServidor}/> 
                <p>{titulo}</p>
                <button className="fecha">{id_categoria}</button>
                <button className="fecha">
                    {fechaFormateada}
                </button>
                <BotonBorrar idTarea={id_tarea} refrescarInfoServidor={refrescarInfoServidor}/>
            </label>   

}
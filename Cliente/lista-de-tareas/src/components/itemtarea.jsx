import React from 'react'
import BotonBorrar from './botonborrar'
import BotonCompletar from './botoncompletar'
import moment from 'moment'

export const ItemTarea = ({ id_tarea, titulo, id_categoria, fecha_creacion, refreshDataFromServer }) => {
    const formattedDate = moment(fecha_creacion).format('DD-MM-YY LT')

    return  <label className="tarea" key={id_tarea}> 
                <BotonCompletar idTarea={id_tarea} refreshDataFromServer={refreshDataFromServer}/> 
                {titulo} 
                <button className="fecha">{id_categoria}</button>
                <button className="fecha">
                    {formattedDate}
                </button>
                <BotonBorrar idTarea={id_tarea} refreshDataFromServer={refreshDataFromServer}/>
            </label>   

}
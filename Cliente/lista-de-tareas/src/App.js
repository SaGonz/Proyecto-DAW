import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    tareas: [],
    tarea: {
      titulo: "prueba",
      fecha_creacion: null,
      checked: false
    }
  }

  componentDidMount() {
    this.getTareas()
    console.log('component mounted')
  }

  getTareas = _ => {
    fetch(`http://`+process.env.REACT_APP_HOST+`:`+process.env.REACT_APP_SERVER_PORT)
    .then(respuesta => respuesta.json())
    .then(respuesta => this.setState({tareas: respuesta.data}))
    .catch(err => console.log(err))
  }
  addTarea = _ => {
    const {tarea} = this.state
    fetch(`http://`+process.env.REACT_APP_HOST+`:`+process.env.REACT_APP_SERVER_PORT+`/llenar?titulo=${tarea.titulo}`)
    .then(this.getTareas)
    .catch(err => console.error(err))

    console.log('addTarea called')
  }

  dosDigitos = (d) => {
    if (0 <= d && d < 10) return "0"+d.toString()
    if (-10 < d && d < 10) return "-0"+(-1*d).toString()
    return d.toString()
  }
  fecha = Date.prototype.toMySQLFormat = () => { 
    return this.getUTCFullYear() + this.dosDigitos(1+this.getUTCMonth()) + "/" + this.dosDigitos(this.getUTCDate()) + 
    "-" + this.dosDigitos(this.getUTCHours()) + this.dosDigitos(this.getUTCMinutes()) + this.dosDigitos(this.getUTCSecons()) 
  }

  renderTareas = ({id_tareas, titulo}) => <div key={id_tareas}>{titulo}</div>
  render(){
    const {tareas, tarea} = this.state 
    return (
      <div className="App">
        <div>
          <form>
            <input onChange={
              e => this.setState({
                tarea: tarea, titulo: e.target.value, fecha_creacion: this.fecha,
              }),
              () => {
                console.log('se ha cambiado la tarea',this.state.tarea.titulo)
              }
            }/>
            <button onClick={this.addTarea}>Add</button>
          </form>
        </div>
        {tareas.map(this.renderTareas)}
      </div>
    )
  }
}


export default App;

import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    tareas: [],
    tarea: {
      titulo: "",
      fecha_creacion: null,
      checked: false
    }
  }

  componentDidMount() {
    this.getTareas()
    console.log('component mounted')
  }

  getTareas = _ => {
    fetch(`http://localhost:3000`)
    .then(respuesta => respuesta.json())
    .then(respuesta => this.setState({tareas: respuesta.data}))
    .catch(err => console.log(err))
  }
  addTarea = _ => {
    const {tarea} = this.state
    fetch(`http://localhost:3000/llenar?titulo=${tarea.titulo}`)
    .then(this.getTareas)
    .catch(err => console.error(err))

    console.log('addTarea called')
  }
  borrarTarea = _ => {

  }
  renderTareas = ({id_tareas, titulo}) => <div key={id_tareas}>{titulo}</div>
  render(){
    const {tareas, tarea} = this.state 
    return (
      <div className="App">
        <div>
          <input onChange={
            e => this.setState({
              tarea: tarea, titulo: e.target.value, fecha_creacion: Date.now(),
            }),
            () => {
              console.log('se ha cambiado la tarea',this.state.tarea.titulo)
            }
          }/>
          <button onClick={this.addTarea}>Add</button>
        <p onMouseOver={
          () => {
            console.log('port',process.env.NODE_ENV,'HOST',process.env.REACT_APP_HOST,'PORT',process.env.REACT_APP_PORT)
          }
        }>holajiajkskajskjak</p>
        </div>
        {tareas.map(this.renderTareas)}
      </div>
    )
  }
}


export default App;

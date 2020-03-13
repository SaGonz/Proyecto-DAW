import React from 'react'
import './App.css'
import Tareas from './components/tareas'
import Completas from './components/completas'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tareas: [],
      tarea: {
        titulo: "prueba",
        fecha_creacion: null,
        checked: false
      }
    }
  }

  componentDidMount() {
    this.getTareas()
  }

  getTareas = _ => {
    fetch(`http://`+process.env.REACT_APP_HOST+`:`+process.env.REACT_APP_SERVER_PORT)
    .then(respuesta => respuesta.json())
    .then(respuesta => this.setState({tareas: respuesta.data}))
    .catch(err => console.log(err))
    console.log('getTareas')
  }
  addTarea = _ => {
    const {tarea} = this.state
    console.log('the state send to the server is', this.state)
    fetch(`http://`+process.env.REACT_APP_HOST+`:`+process.env.REACT_APP_SERVER_PORT+`/llenar?titulo=${tarea.titulo}`)
    .then(this.getTareas())
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

  render(){
    const {tareas, tarea} = this.state 
    return (
      <div className="App" style={{backgroundColor: "#"+ Math.random().toString(16).slice(2, 8)}}>
        <div>
            <input value={this.state.tarea.titulo} onChange={
              e => this.setState({
                tarea: { titulo: e.target.value, fecha_creacion: this.fecha },
              }),
              console.log('state update',)
            }/>
            <button onClick={this.addTarea}>Add</button>
        </div>
        <Tareas listaDeTareas={this.state.tareas}/>
      </div>
    )
  }
}


export default App;

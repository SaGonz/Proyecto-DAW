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
        titulo: '',
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

  render(){
    const {tareas, tarea} = this.state 
    return (
      <div className="App" style={{backgroundColor: "#"+ Math.random().toString(16).slice(2, 8)}}>
        <Tareas listaDeTareas={this.state.tareas} obtenerTareas={this.getTareas}/>
      </div>
    )
  }
}


export default App;

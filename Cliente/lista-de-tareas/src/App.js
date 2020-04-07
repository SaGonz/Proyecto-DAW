import React from 'react'
import './App.css'
import Tareas from './components/tareas'
import Completas from './components/completas';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

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

  //Llamar a Endpoint para conseguir todas las tareas
  getTareas = _ => {
    fetch(`http://`+process.env.REACT_APP_HOST+`:`+process.env.REACT_APP_SERVER_PORT+`/tareas`)
    .then(respuesta => respuesta.json())
    .then(respuesta => this.setState({tareas: respuesta.data}))
    .catch(err => console.log(err))
    console.log('getTareas a endpoint')
  }

  render(){
    const {tareas, tarea} = this.state 
    return (
      <Router>
        <div>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/completas">Tareas completadas</Link></li>
        </div>

        <Switch>
          <Route Path="/">
            <div className="App" style={{backgroundColor: "#"+ Math.random().toString(16).slice(2, 8)}}>
              <Tareas listaDeTareas={this.state.tareas} obtenerTareas={this.getTareas}/>
            </div>
          </Route>
          <Route Path="/completas">
            <Completas />
          </Route>
        </Switch>
      </Router>
    )
  }
}


export default App;

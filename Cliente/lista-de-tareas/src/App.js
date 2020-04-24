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
        estado: '',
        categoria: ''
      }
    }
  }

  componentDidMount() {
    this.getTareas()
    document.title = "Lista de tareas"
  }

  //Llamar a Endpoint para conseguir todas las tareas
  getTareas = _ => {
    fetch(`http://`+process.env.REACT_APP_HOST+`:`+process.env.REACT_APP_SERVER_PORT+`/api/tareas`)
    .then(respuesta => respuesta.json())
    .then(respuesta => this.setState({tareas: respuesta.data}))
    .catch(err => console.log(err))
    console.log('getTareas a endpoint')
  }
  
  actualizarRoot = _ => {
    this.getTareas()
  }

  render(){
    const {tareas, tarea} = this.state 
    return (
      <Router>
        <div className="link-container">
          <li className="link"><Link to="/">INICIO</Link></li>
          <li className="link"><Link to="/completadas" style={{textDecoration: 'none'}}>TAREAS COMPLETADAS</Link></li>
        </div>

        <Switch>
          <Route exact path="/">
            <div className="App" style={{backgroundColor: "#"+ Math.random().toString(16).slice(2, 8)}}>
              <Tareas listaDeTareas={this.state.tareas} obtenerTareas={this.getTareas} actualizarRoot={this.actualizarRoot}/>
            </div>
          </Route>
          <Route path="/completadas">
            <div className="App" style={{backgroundColor: "#"+ Math.random().toString(16).slice(2, 8)}}>
              <Completas/>
            </div>
          </Route>
        </Switch>
      </Router>
    )
  }
}


export default App;

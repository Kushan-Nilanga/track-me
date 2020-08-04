import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Devices from './pages/Devices'
import RegisterDevice from './pages/RegisterDevice'
import NoMatch from './pages/NoMatch'
import SendCommand from './pages/SendCommand'
import Login from './pages/Login'
import Registration from './pages/Registration'
import axios from 'axios'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: false, user: "", devices: []
    }
  }

  handleLoginClick = () => ReactDOM.render(<Login onClickRegister={this.handleRegisterClick} />, document.getElementById("lrcontainer"))
  handleRegisterClick = () => ReactDOM.render(<Registration onClickLogin={this.handleLoginClick} />, document.getElementById("lrcontainer"))
  fetchDevices = () => {
    axios.get('https://track-me-git-master.dknathalage.vercel.app/api/devices').then((response) => {
      let devices = []
      response.data.map((device) => { devices.push({ id: device._id, name: device.name, owner: device.user, sensorData: device.sensorData }) })
      this.setState({ devices })
    })
  }
  handleNewDevice = () => {
    this.fetchDevices();
  }

  componentDidMount() {
    this.fetchDevices();
  }

  render() {
    if (this.state.isLogged) {
      return (
        <React.Fragment>
          <div id="navigation">
            <Router>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand">{this.state.user}</a>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav">
                    <Link to="/" className="nav-item nav-link" >Devices</Link>
                  </div>
                  <div className="navbar-nav">
                    <Link to="register-device" className="nav-item nav-link">Register a device</Link>
                  </div>
                  <div className="navbar-nav">
                    <Link to="send-command" className="nav-item nav-link">Send Command</Link>
                  </div>
                  <div className="navbar-nav">
                    <a className="nav-item nav-link" href="https://kushannilanga.online/contact">About Me</a>
                  </div>
                  <div className="navbar-nav">
                    <a className="nav-item nav-link" onClick={() => this.setState({ isLogged: false })}>Logout</a>
                  </div>
                </div>
              </nav>
              <Switch>
                <Route exact path="/">
                  <Devices devices={this.state.devices} />
                </Route>
                <Route path="/register-device">
                  <RegisterDevice user={this.state.user} onNewDeviceSubmit={this.handleNewDevice} />
                </Route>
                <Route path="/send-command">
                  <SendCommand />
                </Route>
                <Route path="*">
                  <NoMatch />
                </Route>
              </Switch>
            </Router>
          </div>
        </React.Fragment>
      )
    } else {
      return <div id="lrcontainer"><Login onClickRegister={this.handleRegisterClick} onLoginSuccess={(user) => this.setState({ isLogged: true, user: user })} /></div>
    }
  }
}


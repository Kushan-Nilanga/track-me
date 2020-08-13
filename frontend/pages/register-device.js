import React, { Component } from 'react'
import NavBar from '../components/navbar'
import axios from 'axios'

export default class RegisterDevice extends Component {
    constructor(props) {
        super(props);
        this.state = { device: "", user: "" }
    }

    handleChangeUsername = (event) => {
        this.setState({ user: event.target.value })
    }

    handleChangeDeviceName = (event) => {
        this.setState({ device: event.target.value })
    }

    handleFormSubmit = () => {
        axios.post('http://localhost:5000/api/devices', { name: this.state.device, user: this.state.user }).then((res) => {
            document.location.href = '/';
        }).catch((err) => {
            alert(err)
        })
    }

    render() {
        return (
            <div>
                <NavBar></NavBar>
                <h4 >Register New Device</h4>
                <div className="form-group row">
                    <label className="col-4">User</label>
                    <input type="text" className="form-control col-8" id="user" onChange={(event) => this.handleChangeUsername(event)} />
                </div>
                <div className="form-group row">
                    <label className="col-4">Device Name</label>
                    <input type="text" className="form-control col-8" id="name" onChange={(event) => this.handleChangeDeviceName(event)} />
                </div>
                <button className="btn btn-success btn-sm" onClick={() => this.handleFormSubmit()}> Save </button>
                <button className="btn btn-sm"> <a href="/">View devices</a> </button>
            </div>
        )
    }
}

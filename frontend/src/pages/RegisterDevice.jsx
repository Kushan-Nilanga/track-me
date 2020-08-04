import React, { Component } from 'react'
import axios from 'axios'

export default class RegisterDevice extends Component {
    constructor() {
        super();
        this.state = { deviceName: null }
    }

    handleChangeDeviceName = (event) => this.setState({ deviceName: event.target.value })
    handleSubmit = () => {
        if (this.state !== null || this.state !== "") {
            axios.post("https://track-me-git-master.dknathalage.vercel.app/api/devices", { name: this.state.deviceName, user: this.props.user, sensorData: [] })
            this.props.onNewDeviceSubmit()
        } else { alert("Device Register unsuccessful") }
    }

    render() {
        return (
            <div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <div className="card" style={{ position: "absolute", top: "30%", width: "25em" }}>
                    <div className="card-body">
                        <h6 className="card-title">Register device</h6>
                        <div className="form-group">
                            <label>Device Name : &nbsp;</label>
                            <input type="text" onChange={this.handleChangeDeviceName} className="form-control" placeholder="Enter Device Name"></input><br />
                            <button className='btn btn-primary btn-sm mt-3 mb-1 float-right' onClick={this.handleSubmit}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

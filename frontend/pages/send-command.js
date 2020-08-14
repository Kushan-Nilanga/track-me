import React, { Component } from 'react'
import NavBar from '../components/navbar'
import axios from 'axios'
import checkAuth from '../helpers/check-login'

export default class SendCommand extends Component {
    constructor(props) {
        super(props);
        this.state = { deviceId: "", command: "" }
    }

    componentDidMount = () => { if (!checkAuth()) { document.location.href = '/login' } }
    handleCommandChange = (event) => this.setState({ command: event.target.value })
    handleDeviceChange = (event) => this.setState({ device: event.target.valu })
    handleSubmit = () => {
        axios.post('http://localhost:5001/api/send-command', { deviceId: this.state.deviceId, device: this.state.command }).then((res) => {
            console.log(res);
        })
    }
    render() {
        return (
            <div>
                <NavBar></NavBar>
                <div className="m-5">
                    <h3>Send Command</h3>
                    <div >
                        <div className="form-group">
                            <label for="command">Type a Command</label>
                            <input type="text" className="form-control m-1" id="deviceId" onChange={(event) => this.handleDeviceChange(event)}></input>
                            <textarea className="form-control m-1" id="command" onChange={(event) => this.handleCommandChange(event)}></textarea>
                        </div>
                        <button className="btn btn-success btn-sm" id="send-command" onClick={(event) => this.handleSubmit(event)}>Send</button>
                    </div>
                </div>
            </div>
        )
    }
}

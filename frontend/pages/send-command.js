import React, { Component } from 'react'
import NavBar from '../components/navbar'

export default class SendCommand extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <NavBar></NavBar>
                <h3>Send Command</h3>
                <div >
                    <div >
                        <div className="form-group">
                            <label for="command">Type a Command</label>
                            <input type="text" className="form-control" id="deviceId"></input>
                            <textarea className="form-control" id="command"></textarea>
                        </div>
                        <button className="btn btn-success btn-sm" id="send-command">Send</button>
                    </div>
                </div>
            </div>
        )
    }
}

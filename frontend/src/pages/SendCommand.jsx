import React, { Component } from 'react'

export default class SendCommand extends Component {
    constructor() {
        super();
        this.state = { command: "" }
    }

    handleSubmit = () => {console.log(this.state.command)}
    handleChangeCommand = (event) => this.setState({ command: event.target.value })

    render() {
        return (
            <div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <div className="card" style={{ position: "absolute", top: "30%", width: "25em" }}>
                    <div className="card-body">
                        <h6 className="card-title">Send Command</h6>
                        <div className="form-group">
                            <textarea onChange={this.handleChangeCommand} className="form-control" placeholder="Enter a command"></textarea><br />
                            <button className='btn btn-primary btn-sm mt-3 mb-1 float-right' onClick={this.handleSubmit}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import NavBar from '../components/navbar'

export default class RegisterDevice extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <NavBar></NavBar>
                <h4 >Register New Device</h4>
                <div className="form-group row">
                    <label className="col-4">User</label>
                    <input type="text" className="form-control col-8" id="user" />
                </div>
                <div className="form-group row">
                    <label className="col-4">Device Name</label>
                    <input type="text" className="form-control col-8" id="name" />
                </div>
                <button className="btn btn-success btn-sm" > Save </button>
                <button className="btn btn-sm"> <a href="/">View devices</a> </button>    
            </div>
        )
    }
}

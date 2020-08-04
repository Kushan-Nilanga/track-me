import React, { Component } from 'react'
import axios from 'axios';
import ReactDom from 'react-dom';

export default class Login extends Component {
    constructor() {
        super();
        this.state = { username: "Enter Username", password: "Enter Password", isAdmin: false, error: "" }
    }

    handleSubmit = (event) => {
        axios.post('https://track-me-git-master.dknathalage.vercel.app/api/authenticate',
            { user: this.state.username, password: this.state.password }).then((response) => {
                if (response.data.success) { this.props.onLoginSuccess(this.state.username); }
                else {
                    let element = <div className="alert alert-danger alert-sm mt-2">Incorrect username or password</div>
                    ReactDom.render(element, document.getElementById("error"))
                }
            })
    }

    handleChangeUsername = (event) => this.setState({ username: event.target.value })
    handleChangePassword = (event) => this.setState({ password: event.target.value })
    handleRegisterClick = () => this.props.onClickRegister();

    render() {
        return (
            <div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <div className="card" style={{ position: "absolute", top: "30%", width: "25em" }}>
                    <div className="card-body">
                        <h6 className="card-title">Login</h6>
                        <div className="form-group">
                            <label>Username : &nbsp;</label>
                            <input type="text" onChange={this.handleChangeUsername} className="form-control" placeholder="Enter Username"></input><br />
                            <label>Password : &nbsp;</label>
                            <input type="password" onChange={this.handleChangePassword} className="form-control" placeholder="Enter Password"></input>
                            <div id="error"></div>
                            <button className='btn btn-link btn-sm left mt-3 mb-1' onClick={this.handleRegisterClick}>Register</button>
                            <button className='btn btn-primary btn-sm mt-3 mb-1 float-right' onClick={this.handleSubmit}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

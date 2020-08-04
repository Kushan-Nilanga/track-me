import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

export default class Registration extends Component {
    constructor() {
        super();
        this.state = { username: "", confirmPassword: "", password: "" }
    }

    handleChangeUsername = (event) => this.setState({ username: event.target.value })
    handleChangePassword = (event) => this.setState({ password: event.target.value })
    handleChangeConfirmPassword = (event) => this.setState({ confirmPassword: event.target.value })
    handleLoginClick = () => this.props.onClickLogin();

    handleSubmit = () => {
        if (this.state.confirmPassword !== this.state.password) ReactDOM.render(<div className="alert alert-danger">Passwords doesn't match</div>)
        if (this.state.confirmPassword === "" || this.state.password === "") ReactDOM.render(<div className="alert alert-danger">Fields cannot be empty</div>)
        else {
            axios.post("https://track-me-git-master.dknathalage.vercel.app/api/registration",
                { user: this.state.username, password: this.state.password, isAdmin: 1 })
                .then((response) => { this.handleLoginClick(); })
        }
    }

    render() {
        return (
            <div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <div className="card" style={{ position: "absolute", top: "30%", width: "25em" }}>
                    <div className="card-body">
                        <h6 className="card-title">Register</h6>
                        <div className="form-group">
                            <label>Username : &nbsp;</label>
                            <input type="text" onChange={this.handleChangeUsername} className="form-control" placeholder="Enter Username"></input><br />
                            <label>Password : &nbsp;</label>
                            <input type="password" onChange={this.handleChangePassword} className="form-control" placeholder="Enter Password"></input><br />
                            <label>Confirm password : &nbsp;</label>
                            <input type="password" onChange={this.handleChangeConfirmPassword} className="form-control" placeholder="Re-enter Password"></input>
                            <div id="error"></div>
                            <button className='btn btn-link btn-sm left mt-3 mb-1' onClick={this.handleLoginClick}>Login</button>
                            <button className='btn btn-primary btn-sm mt-3 mb-1 float-right' onClick={this.handleSubmit}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import axios from 'axios'

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = { user: "", pw: "", pw_con: "" }
    }

    handleUsernameChange = (event) => {
        this.setState({ user: event.target.value })
    }

    handlePasswordChange = (event) => {
        this.setState({ pw: event.target.value });
    }

    handleConfirmationChange = (event) => {
        this.setState({ pw_con: event.target.value })
    }

    handleSubmit = () => {
        if (this.state.pw == this.state.pw_con && this.state.pw != "") {
            axios.post("http://localhost:5000/api/registration", { user: this.state.user, password: this.state.password })
                .catch((err) => { 
                    alert(err.message)
                })
        } else { 
            alert("passwords should match and be longer than one character")
        }
        document.location.href = '/login'
    }

    render() {
        return (
            <div>
                <div>
                    <h4 style={{ "padding": "1em" }}>Registeration</h4>
                    <div>
                        <div className="form-group row">
                            <label htmlFor="user" className="col-4" style={{ "padding": "1%" }}>User name</label>
                            <input type="text" className="form-control col-8" id="username" onChange={(event) => this.handleUsernameChange(event)} />
                            <label htmlFor="name" className="col-4" style={{ "padding": "1%" }}>Password</label>
                            <input type="password" className="form-control col-8" id="password" onChange={(event) => this.handlePasswordChange(event)} />
                            <label htmlFor="name" className="col-4" style={{ "padding": "1%" }}>Confirm password</label>
                            <input type="password" className="form-control col-8" id="c_password" onChange={(event) => this.handleConfirmationChange(event)} />
                            <div style={{ "width": "100%!important" }}><p id="error" style={{ "color": "red", "float": "right" }} /></div>
                        </div>
                        <button className="btn btn-success btn-sm" style={{ "float": "right", "width": "20%" }} id="register" onClick={() => this.handleSubmit()}>Register</button>
                        <button className="btn btn-link btn-sm" style={{ "float": "right", "width": "20%" }} />
                        <a href="/login">Sign in</a>
                    </div>
                </div>
            </div>
        )
    }
}

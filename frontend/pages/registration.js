import React, { Component } from 'react'
import axios from 'axios'
import NavBar from '../components/navbar'

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = { user: "", pw: "", pw_con: "" }
    }

    handleUsernameChange = (event) =>  this.setState({ user: event.target.value })
    handlePasswordChange = (event) => this.setState({ pw: event.target.value });
    handleConfirmationChange = (event) => this.setState({ pw_con: event.target.value })

    handleSubmit = () => {
        if (this.state.pw == this.state.pw_con && this.state.pw != "") {
            axios.post("http://localhost:5000/api/registration", { user: this.state.user, password: this.state.password })
                .then((res) => { document.location.href = '/login' })
                .catch((err) => { 
                    alert(err.message)
                })
        } else { 
            alert("passwords should match and be longer than one character")
        }
    }

    render() {
        return (
            <div>
                <NavBar></NavBar>
                <div className="m-5">
                    <h4>Registeration</h4>
                    <div>
                        <div className="form-group row">
                            <label htmlFor="user" className="col-4" >User name</label>
                            <input type="text" className="form-control col-8" id="username" onChange={(event) => this.handleUsernameChange(event)} />
                            <label htmlFor="name" className="col-4" >Password</label>
                            <input type="password" className="form-control col-8" id="password" onChange={(event) => this.handlePasswordChange(event)} />
                            <label htmlFor="name" className="col-4" >Confirm password</label>
                            <input type="password" className="form-control col-8" id="c_password" onChange={(event) => this.handleConfirmationChange(event)} />
                            <div style={{ "width": "100%!important" }}><p id="error" /></div>
                        </div>
                        <button className="btn btn-success btn-sm" id="register" onClick={() => this.handleSubmit()}>Register</button>
                        <button className="btn btn-link btn-sm" />
                        <a href="/login">Sign in</a>
                    </div>
                </div>
            </div>
        )
    }
}

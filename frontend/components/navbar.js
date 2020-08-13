import React from "react";


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loginText: 'Log in'}
    }

    handleLogOutButtonClick = (target) => {
        document.location.href = "/login"
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">TrackMe</a>
                <div className="collapse navbar-collapse" id="expanded-nav">
                    <div className="navbar-nav" id="auth-nav">
                        <a className="nav-item nav-link" href="/">Devices</a>
                        <a className="nav-item nav-link" href="/register-device">Register Device</a>
                        <a className="nav-item nav-link" href="/send-command">Send Command</a>
                        <a className="nav-item nav-link" href="/registration">Registration</a>
                        <a className="nav-item nav-link" href="/about">About Me</a>
                        <button id="logout-btn" value="Logout" className="btn btn-link" onClick={() => this.handleLogOutButtonClick()}>Logout</button>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;
import React from "react";


class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    handleLogButtonClick = (target) => {
        this.props.onLogout()
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
                        <a className="nav-item nav-link" href="/about">About Me</a>
                        <button id="logout-btn" value="Logout" className="btn btn-link" onClick={(e) => this.handleLogButtonClick(e)}>asdasd</button>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;
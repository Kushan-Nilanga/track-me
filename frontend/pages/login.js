export default class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    handleLoginClick = () => { 
        document.location.href = "/"
        localStorage.setItem(User, 'test');
    }

    render() {
        return (
            <div> 
                <h4>Log in</h4>
                <div>
                    <div className="form-group row">
                        <label className="col-4">User name</label>
                        <input type="text" className="form-control col-8" id="uname" />
                        <label className="col-4">Password</label>
                        <input type="password" className="form-control col-8" id="pword" />
                        <div style={{ width: "100%!important" }}><p id="error"></p></div>
                    </div>
                    <button className="btn btn-success btn-sm" onClick={() => this.handleLoginClick()}>Sign in</button>
                    <a href="/registration">Register</a>
                </div>
            </div>
        );
    }
}
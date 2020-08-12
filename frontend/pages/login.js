export default class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{ width: "30em", height: "40 %", position: "absolute", left: "50 %", top: "50 %", transform: "translate(-50 %, -50 %)", textAlign: "center" }}>
                <h4 style={{ padding: "1em" }}>Log in</h4>
                <div>
                    <div className="form-group row">
                        <label for="user" className="col-4" style={{ padding: "1%" }}>User name</label>
                        <input type="text" className="form-control col-8" id="uname" />
                        <label for="name" className="col-4" style={{ padding: "1%" }}>Password</label>
                        <input type="password" className="form-control col-8" id="pword" />
                        <div style={{ width: "100%!important" }}><p id="error" style={{ color: "red", float: "right" }}></p></div>
                    </div>
                    <button className="btn btn-success btn-sm" style={{ float: "right", width: "20%" }} id="login">Sign in</button>
                    <a href="/registration">Register</a>
                </div>
            </div>
        );
    }
}
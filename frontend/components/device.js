import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class device extends Component {
    constructor(props) {
        super(props)
        this.state = {isCardOpen:false}
    }

    onDeviceClick = () => {
        this.setState({isCardOpen:!this.state.isCardOpen})
        if(this.state.isCardOpen==true){
            const elem = <div className="card" style={{width:"125%"}}>
                    <div className="card-body" style={{width:"125%"}}>
                        <table style={{width:"80%"}}>
                            <thead style={{width:"100%"}}>
                                <tr>
                                    <td>Timestamp</td>
                                    <td>Temperature</td>
                                    <td>Longitude</td>
                                    <td>Latitude</td>
                                </tr>
                            </thead>
                            <tbody style={{width:"100%"}}>
                                {this.props.sensorData.map((data)=>
                                    <tr key={data._id}>
                                        <td>{data.ts}</td>
                                        <td>{data.temp}</td>
                                        <td>{data.loc.lon}</td>
                                        <td>{data.loc.lat}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ReactDOM.render(elem, document.getElementById(this.props.id))
        }
        else{ReactDOM.render(<></>, document.getElementById(this.props.id))}
    }

    render() {
        return (
            <>
                <tr key={this.props.id}>
                    <td>{this.props.user}</td>
                    <td><button className="btn btn-light btn-sm" onClick={()=>{this.onDeviceClick()}}>{this.props.name}</button></td>
                </tr>
                <div id={this.props.id}></div>
            </>
        )
    }
}
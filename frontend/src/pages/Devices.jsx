import React, { Component } from 'react';
import Device from '../components/Device'
import ReactDOM from 'react-dom'
import SensorData from '../components/SensorData'

class Devices extends Component {
    constructor() {
        super();
        this.state = { element: null, device: null }
    }

    handleDeviceClick = (device) => {
        let elem = <SensorData data={device.sensorData} />
        this.setState({ element: elem })
        ReactDOM.render(this.state.element, document.getElementById("sensordata"));
    }

    componentDidMount = () => {
        let devices = this.props.devices.map((device) => <Device onDeviceClick={this.handleDeviceClick} key={device.id} id={device.id} name={device.name} owner={device.owner} sensorData={device.sensorData} />);
        ReactDOM.render(<React.Fragment>{devices}</React.Fragment>, document.getElementById("devicelist"))
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                    <div>
                        <div className="row">
                            <div className="col">
                                <div className="card" style={{ position: "relative", top: "30%", width: "25em" }}>
                                    <div className="card-body">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Device</th>
                                                    <th>Owner</th>
                                                </tr>
                                            </thead>
                                            <tbody id="devicelist">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col" id="sensordata">
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Devices;
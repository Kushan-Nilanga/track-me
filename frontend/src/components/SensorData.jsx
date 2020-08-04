import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class SensorData extends Component {
    componentDidMount = () => {
        let rows = this.props.data.map((row) =>
            <tr key={this.props.data.indexOf(row)}>
                <td>{row.ts}</td>
                <td>{row.temp}</td>
                <td>{row.loc.lat}</td>
                <td>{row.loc.lon}</td>
            </tr>
        );
        ReactDOM.render(rows, document.getElementById("table"))
    }

    render() {
        return (
            <div className="card" style={{ position: "relative", top: "30%", width: "30em" }}>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Temperature</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                            </tr>
                        </thead>
                        <tbody id="table"></tbody>
                    </table>
                </div>
            </div>
        )
    }
}

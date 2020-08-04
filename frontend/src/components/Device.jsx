import React, { Component } from 'react'

export default class Device extends Component {

    handleClick = (event) => {
        this.props.onDeviceClick(this.props)
    }

    render() {
        return (
            <React.Fragment>
                <tr onClick={this.handleClick}>
                    <td>{this.props.name}</td>
                    <td>{this.props.owner}</td>
                </tr>
            </React.Fragment>
        )
    }
}

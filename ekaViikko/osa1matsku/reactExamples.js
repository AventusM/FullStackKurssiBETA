// import React from 'react'
// import ReactDOM from 'react-dom'
class Hello extends React.Component {
    render() {
        return (
            <div>
                <p>Hello {this.props.name}, you are {this.props.age} years old</p>
            </div>
        )
    }
}

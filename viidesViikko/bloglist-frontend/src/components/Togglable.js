import React from 'react'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisibility}>hide</button>
        </div>
      </div>
    )
  }
}

class TogglableDiv extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      likes: 0,
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  addLikes = () => {
    this.setState({ likes: this.state.likes + 1 })
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          <div onClick={this.toggleVisibility}>{this.props.title} {this.props.author}</div>
        </div>
        <div style={showWhenVisible}>
          <div onClick={this.toggleVisibility}>{this.props.children}</div>
        </div>
      </div>
    )
  }
}

export { Togglable, TogglableDiv }
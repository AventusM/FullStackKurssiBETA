import React from 'react'
import { Button, Row } from 'react-bootstrap'

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

    const styles = {
      normalButton: {
        background: '#f4e9e1'
      },
      marginTop: {
        background: '#f4e9e1',
        marginTop: '-53px',
        marginLeft: '60px'
      }
    }

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button style={styles.normalButton} bsSize="small" onClick={this.toggleVisibility}>{this.props.buttonLabel}</Button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <Button style={styles.marginTop} bsSize="small" onClick={this.toggleVisibility}>&nbsp;hide&nbsp;&nbsp;</Button>
        </div>
        <hr />
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
    const styles = {
      blogStyle: {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
    }


    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div style={styles.blogStyle}>
        <div style={hideWhenVisible} className="defaultVisible">
          <div onClick={this.toggleVisibility}>{this.props.title} {this.props.author}</div>
        </div>
        <div style={showWhenVisible} className="allVisible">
          <div onClick={this.toggleVisibility}>{this.props.children}</div>
        </div>
      </div>
    )
  }
}

export { Togglable, TogglableDiv }
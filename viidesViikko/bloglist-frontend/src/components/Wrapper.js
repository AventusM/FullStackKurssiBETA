import React from 'react'
import LoginForm from './LoginForm'

class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formInput: ''
    }
  }

  onChange = (event) => {
    this.setState({ formInput: event.target.value })
  }

  render() {
    return (
      <LoginForm
        username={this.props.username}
        password={this.props.password}
        handleChange={this.onChange}
        handleSubmit={this.props.onSubmit}
      />
    )
  }

}

export default { Wrapper }
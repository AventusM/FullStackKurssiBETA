import React from 'react'

class Notification extends React.Component {
  render() {
    console.log('kutsu Notification - luokan sisältä: ', this.props.store.getState().message)
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {this.props.store.getState().message}
      </div>
    )
  }
}

export default Notification
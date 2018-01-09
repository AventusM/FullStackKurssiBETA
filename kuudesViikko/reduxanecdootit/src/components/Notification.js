import React from 'react'

class Notification extends React.Component {
  render() {
    const isNull = this.props.store.getState().message === null
    console.log('kutsu Notification - luokan sisältä: ', this.props.store.getState().message)
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div>
        {isNull
          ? <p></p>
          : <div style={style}>
            {this.props.store.getState().message}
          </div>}
      </div>
    )
  }
}

export default Notification
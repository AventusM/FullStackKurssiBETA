import React from 'react'
import { message } from './../reducers/messageReducer'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const { message } = this.props
    const isNull = message === null
    // const isNull = this.props.store.getState().message === null
    // console.log('kutsu Notification - luokan sisältä: ', this.props.store.getState().message)
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
            {message}
          </div>}
      </div>
    )
  }
}

const mapDispatchToProps = (state) => {
  return {
    message: state.message
  }
}
const ConnectedNotification = connect(mapDispatchToProps)(Notification)
export default ConnectedNotification
// export default Notification
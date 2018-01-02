import React from 'react'

const Notification = (props) => {
  let shownMsg
  let shownStyle
  const { error, msg } = props
  if (error === null && msg === null) {
    return null
  } else if (error !== null && msg === null) {
    shownMsg = error
    shownStyle = 'error'
  } else {
    shownMsg = msg
    shownStyle = 'success'
  }

  return (
    <div className={shownStyle}>
      {shownMsg}
    </div>
  )
}

export default Notification
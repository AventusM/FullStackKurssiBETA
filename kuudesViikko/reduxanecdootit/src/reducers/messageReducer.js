const messageReducer = (state = null, action) => {
  console.log('ACTION: ' + action)
  switch (action.type) {
    case 'NEW_MESSAGE':
      return action.message
    case 'DELETE_MESSAGE':
      return null
    default:
      return state
  }
}

export const changeMessage = (message) => {
  return {
    type: 'NEW_MESSAGE',
    message
  }
}

export const deleteMessage = () => {
  return {
    type: 'DELETE_MESSAGE'
  }
}

export default messageReducer
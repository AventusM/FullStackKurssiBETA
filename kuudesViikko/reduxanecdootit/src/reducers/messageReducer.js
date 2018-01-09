const messageReducer = (state = 'TestiPohjaViesti', action) => {
  switch (action.type) {
    case 'NEW_MESSAGE': // Toistaiseksi ainoa, tilanne näyttää hassulta kun kaikki on samassa tiedostossa
      return action.message
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

export default messageReducer
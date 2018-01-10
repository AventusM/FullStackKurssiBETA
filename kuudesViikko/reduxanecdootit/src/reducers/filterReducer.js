const inputFilterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}

export const inputFilterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    filter //filter : filter
  }
}

export default inputFilterReducer
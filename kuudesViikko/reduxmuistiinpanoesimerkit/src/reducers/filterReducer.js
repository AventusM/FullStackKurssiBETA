//MUUTOSLOGIIKKA TÄLLÄ KERTAA PITKÄLTI App.js - tiedostossa
const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}

//Tämä dispatchataan --> filtteri katsotaan filterReducerissa
export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    filter //filter: filter ..
  }
}

export default filterReducer
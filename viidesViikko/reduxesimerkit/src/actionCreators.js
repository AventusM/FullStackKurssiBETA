import React from 'react'
const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const actionFor = {
  noteCreation(content) {
    return {
      type: 'NEW_NOTE',
      data: {
        content: content,
        important: false,
        id: generateId()
      }
    }
  },
  importanceToggling(id) {
    return {
      type: 'TOGGLE_IMPORTANCE',
      data: { id }
    }
  }
}

export default actionFor
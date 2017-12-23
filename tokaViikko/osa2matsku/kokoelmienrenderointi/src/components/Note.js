import React from 'react'

//Saattaa olla ihan kiva apu edellisen kappaleen
//tehtävään.. Tee myöhemmin jos muistat
const Note = (props) => {
    const { note, toggleImportance } = props
    const label = note.important ?
        'make not important' : //True -> pitää tehdä ei-tärkeäksi
        'make important'
    return (
        <li>
            {note.content}
            <button onClick={toggleImportance}>
                {label}
            </button>
        </li>
    )
}
export default Note
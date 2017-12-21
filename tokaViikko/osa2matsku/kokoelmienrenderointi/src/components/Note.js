import React from 'react'

const Note = (props) => {
    //Jätetään funktion omat parametrit rauhaan
    //Ja tehdään tarvittava muutos NoteteraaNoten sisällä
    //Tiedetään, että tänne päästään tunnuksella 'note'
    // -> eristetään se toisen NoteteraaNoten avulla
    const { note } = props
    return (
        <li>
            {note.content}
        </li>
    )
}
//Exportataan juuri 'Note' - literaali
export default Note
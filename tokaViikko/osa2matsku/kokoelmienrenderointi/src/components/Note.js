import React from 'react'

const Note = (props) => {
    //Jätetään funktion omat parametrit rauhaan
    //Ja tehdään tarvittava muutos NoteteraaNoten sisällä
    //Tiedetään, että tänne päästään tunnuksella 'note'
    // -> eristetään se toisen NoteteraaNoten avulla
    const { note } = props
    console.log(note)
    //Testi omaan käyttöön
    const getStatus =
        note.important ?
            "on" :
            "ei"
    return (
        <li>
            {/* Booleania ei printata suoraan, täytyy kikkailla ohtun tapaan... */}
            {/* Käytetään mieluummin "on"/"ei" truen ja falsen sijasta... */}
            {note.content} - Tärkeä? {getStatus}
        </li>
    )
}
//Exportataan juuri 'Note' - literaali
export default Note
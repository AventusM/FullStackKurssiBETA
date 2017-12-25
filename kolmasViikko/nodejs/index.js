// const http = require('http')

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'text/json' })
//     response.end(JSON.stringify(notes))
// })

// const port = 3001
// app.listen(port)
// console.log(`Server running on port ${port}`)

//Voi antaa parametrin suoraan vakioliteraalille
//huom JSON.stringify(notes)

//Asetukset
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // POST

//Palautetaan tilanne ennalleen, jos tehdään testejä postmanilla
let notes = [
    {
        id: 1,
        content: 'HTML on helppoa',
        date: '2017-12-10T17:30:31.098Z',
        important: true
    },
    {
        id: 2,
        content: 'Selain pystyy suorittamaan vain javascriptiä',
        date: '2017-12-10T18:39:34.091Z',
        important: false
    },
    {
        id: 3,
        content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
        date: '2017-12-10T19:20:14.298Z',
        important: true
    }
]

//GET
//GET

app.get('/', (request, response) => {
    response.send('<h1>Morot</h1>')
})

app.get('/notes', (request, response) => {
    response.json(notes) // Tapahtuu automaattinen JSON.Stringify(notes)
})

app.get('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(n => n.id === id)
    // response.json(note)

    //Lisätään 404 omin päin
    //Ilmoitus löytyy konsolista ---> network
    //truthy ---> arvo on olemassa. jos !note niin tuloksena on undefined
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})


// POST
// POST
app.post('/notes', (request, response) => {
    const body = request.body
    //LUONNOLLISESTI EI HALUTA ID = 0

    if (body.content === undefined) {
        response.status(400).json({ error: 'missä sisältö?' })
    }

    const note = {
        content: body.content,
        important: false,
        //body.date olemassa? date saa arvokseen sen
        //ei olemassa? luodaan uusi date kentän arvoksi
        date: body.date || new Date(),
        id: generateId() //Palauttaa arvon -> sulkeet mukaan

    }

    //Päivitetään muistiinpanot
    notes = notes.concat(note)
    response.json(note)
})

//apumetodi id:n saamiseksi
const generateId = () => {
    const maxId = notes.length > 0 ?
        notes.map(note => note.id).sort().reverse()[0] : //Haetaan 1. alkio järjestetystä taulukosta
        0 //tyhjä taulu -> asetetaan 1. muistiinpanon arvo
    return maxId + 1
}


//DELETE
//DELETE

app.delete('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(n => n.id !== id)

    response.status(404).end()
})

const port = 3001
app.listen(port)
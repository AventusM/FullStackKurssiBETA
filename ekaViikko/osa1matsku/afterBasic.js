const anton = {
    nimi: 'Anton Moroz',
    ika: 24,
    motto: function () {
        console.log('"Be good and just" - ' + this.nimi)
    },
    kertoLasku: function (eka, toka) {
        console.log(eka * toka)
    }
}

// anton.motto()

// anton.nuorene = function () {
//     this.ika -= 1
// }

// console.log("Antonin ikä -> " + anton.ika)
// //Muista aina laittaa sulkeet funktion lopuksi, vaikka se olisikin vakion sisällä
// anton.nuorene()
// console.log("Antonin ikä nyt -> " + anton.ika)
// console.log(anton)

// anton.kertoLasku(2,2)
// const viiteKertoLaskuun = anton.kertoLasku
// viiteKertoLaskuun(10,10)

//Ei bindiä -> undefined
// setTimeout(anton.motto, 2000)
// const viiteMottoon = anton.motto
// viiteMottoon()

//Bind mukana -> tiedetään mihin 'this' viittaa
// setTimeout(anton.motto.bind(anton), 2000)

class Henkilo {
    constructor(nimi, ika) {
        this.nimi = nimi
        this.ika = ika
    }
    info() {
        console.log('Nimi: ' + this.nimi + "\nIkä: " + this.ika)
    }
}

const antonm = new Henkilo('Anton Moroz', 24)
antonm.info()
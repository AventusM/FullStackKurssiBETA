// const vakio = 8
// let muuttuja = 93

// console.log("Vakion arvo: " + vakio)
// console.log("Muuttujan arvo: " + muuttuja)
// muuttuja += 7
// console.log("Muuttujaa muutettu, arvo nyt: " + muuttuja)
// muuttuja = "MOI"
// console.log("Muuttuja on nyt teksti lolwut? -> " + muuttuja)
// // Vakiota ei voi muuttaa (final) ->  vakio = 10 antaa virheen

// //Taulukko olio -> saa muokata vaikka const
// const taulu = [1, 2, 3]
// taulu.push(10)
// console.log("Taulun pituus: " + taulu.length)
// console.log("Taulun viimeinen alkio " + taulu[taulu.length - 1])

// console.log("Käydään taulukko läpi ...")
// taulu.forEach((luku) => {
//     console.log(luku)
// })

// taulu[0] = -1
// console.log("Muutetaan 1. alkio -> taulu nyt: " + taulu)

// console.log("Tehdään jokaiseen taulun alkioon pieni vakiolisäys")
// const muutettuTaulu1 = taulu.map((luku) => luku + 10)
// console.log(muutettuTaulu1)

// const muutettuTaulu2 = taulu.map((luku) => '<p>' + luku + "</p>")
// console.log(muutettuTaulu2)


// const anton = {
//     nimi: {
//         etunimi: 'Anton',
//         sukunimi: 'Moroz'
//     },
//     tyyppi: 'Opiskelija'
// }

// console.log(anton.nimi.etunimi)
// console.log(anton.nimi.sukunimi)
// console.log(anton.nimi)

// //Viitataan anton - olion tyyppiin kulmasulkeilla
// const tyyppiKenttaNimi = 'tyyppi'
// console.log(anton[tyyppiKenttaNimi])

// //Viitataan anton - olion tyyppiin pistenotaatiolla
// console.log(anton.tyyppi)

// //Lisätään anton - oliolle uusi kenttä
// anton.opiskelupaikka = 'Kumpulan kampus'
// console.log(anton)

const erotus = (eka, toka) => {
    console.log("Eka luku: " + eka)
    console.log("Toka luku: " + toka)
    return eka - toka
}

const lasku = erotus(5, 1)
console.log("Erotus: " + lasku)

const kuutio = p => p * p * p
const taulu = [0, 1, 2]
const tauluKuutio = taulu.map(p => p * p * p)
console.log(tauluKuutio)